import { CustomError } from "./errors/custom.error";

export class UserEntity{
    constructor(
        public id:string,
        public name: string,        
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ){}

    static fromObject(object:{[key:string]:any}){
        const {id,_id,name,email,emailValidated,password,role,img} = object;

        if(!_id && !id){
            throw CustomError.badRequest('Missign ID');
        }
        if(!name) throw CustomError.badRequest('Misssing name');
        if(!email) throw CustomError.badRequest('Misssing email');
        if(emailValidated === undefined) throw CustomError.badRequest('Misssing emailValidated');
        if(!password) throw CustomError.badRequest('Misssing password');
        if(!role) throw CustomError.badRequest('Misssing role');

        return new UserEntity(_id || id,name,email,emailValidated,password,role,img);
    }
}