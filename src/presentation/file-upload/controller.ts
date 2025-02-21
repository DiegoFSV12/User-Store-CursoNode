import { Request, Response } from "express"
import { CustomError } from "../../domain";
import { FileUploadService } from "../service/file-upload.service";
import { UploadedFile } from "express-fileupload";


export class FileUploadController{
    constructor(
        private readonly fileUploadService:FileUploadService,
    ){}

    private handleError = (error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(Number(error.statusCode)).json({error:error.message});
        }
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }

    uploadFile = async(req:Request, res:Response) =>{
        const type = req.params.type;
        const validTypes = ['users','products','categories'];
        if(!validTypes.includes(type)){
            return res.status(400).json({error: `Invalid type: ${type}, valid ones ${validTypes}`});
        }
        
        const file = req.body.files.at(0) as UploadedFile;
        this.fileUploadService.uploadFile(file,`uploads/${type}`)
            .then(file => res.json(file))
            .catch(error => this.handleError(error,res));
    }

    uploadMultipleFile = async(req:Request, res:Response) =>{
        res.json('Upload multiple file');
    }
}