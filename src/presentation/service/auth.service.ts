import { UserModel } from "../../data";
import { CustomError, RegisterUserDTO } from "../../domain";

export class AuthService{
    constructor(){}
    
    public async registerUser(registerDTO:RegisterUserDTO){
        const existUser = await UserModel.findOne({email:registerDTO.email});
        if(existUser) throw CustomError.badRequest('Email already exist');
        return 'All OK';
    }
}