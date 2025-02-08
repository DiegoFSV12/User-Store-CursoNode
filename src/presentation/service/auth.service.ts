import { bcryptAdapter, envs, jwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDTO, RegisterUserDTO, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService{
    constructor(
        private readonly emailService:EmailService,
    ){}
    
    public async registerUser(registerDTO:RegisterUserDTO){
        const existUser = await UserModel.findOne({email:registerDTO.email});
        if(existUser) throw CustomError.badRequest('Email already exist');
        try {
            const user = new UserModel(registerDTO);
            //Encriptar la contraseña
            user.password = bcryptAdapter.hash(registerDTO.password);
            await user.save();
            //JWT para mantener la autenitcación de usuario
            const token = await jwtAdapter.generateToken({id:user.id});
            if(!token) throw CustomError.internalServer('Error while creating JWT');
            //Email de confirmación
            await this.sendEmailValidation(user.email);

            const {password, ...userEntity} = UserEntity.fromObject(user);
            return {
                user: userEntity,
                token:token};
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDTO:LoginUserDTO){
        const user = await UserModel.findOne({email:loginUserDTO.email});
        if(!user) throw CustomError.badRequest('Email has not registered');
        const isMatch = bcryptAdapter.compare(loginUserDTO.password,user.password);
        if(!isMatch) throw CustomError.badRequest('Incorrect password');
        try {
            const {password, ...userEntity} = UserEntity.fromObject(user);

            const token = await jwtAdapter.generateToken({id:user.id});
            if(!token) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: userEntity,
                token:token
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    private sendEmailValidation = async(email:string) => {
        //Generamos un token que contiene el email
        const token = await jwtAdapter.generateToken({email});
        if(!token) throw CustomError.internalServer('Error while creating JWT');
        //Crear enlace de autenticación
        const link = `${envs.WEB_SERVICE_URL}/auth/validate-email/${token}`;
        //Crear html
        const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${link}">Validate your email: ${email}</a>
        `;
        const options = {
            to:email,
            subject: 'Validate your email',
            htmlBody: html,
        }
        const isSent = await this.emailService.sendEmail(options);
        if(!isSent) throw CustomError.internalServer('Error sending email');
    }
}