import { Request, Response } from "express"
import { CustomError } from "../../domain";
import { FileUploadService } from "../service/file-upload.service";
import { UploadedFile } from "express-fileupload";
import { isArray } from "util";


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
        const type = req.url.split('/').at(2);//el req.params.type ya no funciona xq el middleware que valida el type se ejecuta antes
        const num = req.files!.file as UploadedFile[];
        if(num.length != undefined) return res.status(400).json('No more than oner file on this route');
        const file = req.body.files.at(0) as UploadedFile;
        this.fileUploadService.uploadFile(file,`uploads/${type}`)
            .then(file => res.json(file))
            .catch(error => this.handleError(error,res));
    }

    uploadMultipleFile = async(req:Request, res:Response) =>{
        const type = req.url.split('/').at(2);
        const files = req.files!.file as UploadedFile[];
        this.fileUploadService.uploadMultipleFile(files,`uploads/${type}`)
            .then(file => res.json(file))
            .catch(error => this.handleError(error,res));
    }

    
}