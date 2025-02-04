import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDTO, UserEntity } from "../../domain";

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
}