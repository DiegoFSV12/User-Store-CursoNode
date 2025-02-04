import { Request, Response } from "express"
import { CustomError, RegisterUserDTO } from "../../domain";
import { AuthService } from "../service/auth.service";

export class AuthController{
    constructor(
        public readonly authService: AuthService,
    ){}

    private handleError = (error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(Number(error.statusCode)).json({error:error.message});
        }
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }

    register = (req:Request, res: Response) =>{
        const [error,registerDTO] = RegisterUserDTO.create(req.body);
        if(error) return res.status(400).json({error});
        this.authService.registerUser(registerDTO!)
        .then((user)=>res.json(user))
        .catch(error => this.handleError(error,res));
    }

    loginUser = (req:Request, res: Response) =>{
        res.json('Login User');
    }

    validateEmail = (req:Request, res: Response) =>{
        res.json('Validate User');
    }

}