import { Request, Response } from "express"

export class AuthController{
    constructor(){}

    register = (req:Request, res: Response) =>{
        res.json('Register User');
    }

    loginUser = (req:Request, res: Response) =>{
        res.json('Login User');
    }

    validateEmail = (req:Request, res: Response) =>{
        res.json('Validate User');
    }

}