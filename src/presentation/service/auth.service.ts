import { bcryptAdapter, jwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDTO, RegisterUserDTO, UserEntity } from "../../domain";

export class AuthService{
    constructor(){}
    
    public async registerUser(registerDTO:RegisterUserDTO){
        const existUser = await UserModel.findOne({email:registerDTO.email});
        if(existUser) throw CustomError.badRequest('Email already exist');
        try {
            const user = new UserModel(registerDTO);
            //Encriptar la contraseña
            user.password = bcryptAdapter.hash(registerDTO.password);
            await user.save();
            //JWT para mantener la autenitcación de usuario

            //Email de confirmación

            const {password, ...userEntity} = UserEntity.fromObject(user);
            return {
                user: userEntity,
                token:'ABC'};
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

            const token = await jwtAdapter.generateToken({id:user.id, email:user.email});
            if(!token) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: userEntity,
                token:token
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}