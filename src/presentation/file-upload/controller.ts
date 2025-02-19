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
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({error: 'No files were selected'});
        }
        const file = req.files.file as UploadedFile;
        this.fileUploadService.uploadFile(file)
            .then(file => res.json(file))
            .catch(error => this.handleError(error,res));
    }

    uploadMultipleFile = async(req:Request, res:Response) =>{
        res.json('Upload multiple file');
    }
}