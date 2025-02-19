import { Request, Response } from "express"
import { CustomError } from "../../domain";


export class FileUploadController{
    constructor(
        
    ){}

    private handleError = (error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(Number(error.statusCode)).json({error:error.message});
        }
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }

    uploadFile = async(req:Request, res:Response) =>{
        console.log({file: req.files});
        res.json('Upload file');
    }

    uploadMultipleFile = async(req:Request, res:Response) =>{
        res.json('Upload multiple file');
    }
}