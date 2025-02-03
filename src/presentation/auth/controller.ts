import { Request, Response } from "express"
import { RegisterUserDTO } from "../../domain";
import { AuthService } from "../service/auth.service";

export class AuthController{
    constructor(
        public readonly authService: AuthService,
    ){}

    register = (req:Request, res: Response) =>{
        const [error,registerDTO] = RegisterUserDTO.create(req.body);
        if(error) return res.status(400).json({error});
        this.authService.registerUser(registerDTO!)
        .then((user)=>res.json(user));
    }

    loginUser = (req:Request, res: Response) =>{
        res.json('Login User');
    }

    validateEmail = (req:Request, res: Response) =>{
        res.json('Validate User');
    }

}