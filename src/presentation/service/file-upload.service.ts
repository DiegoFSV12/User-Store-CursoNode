import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from 'fs';
import { Uuid } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadService{
    constructor(
        private readonly uuid = Uuid.v4,
    ){}

    private checkFolder(folderPath:string){
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath);
        }
    }

    async uploadFile(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png','jpg','jpeg','gif']
    ){
        try {
            const fileExtension = file.mimetype.split('/').at(1) ?? '';//Corta el mimetype para obtener el tipo de archivo (png,jpg,jpeg...)
            if(!validExtensions.includes(fileExtension)){
                throw CustomError.badRequest(`Invalid extension : ${fileExtension}, valid ones ${validExtensions}`)
            }
            const destination = path.resolve(__dirname,'../../../',folder);
            this.checkFolder(destination);
            const fileName = `${this.uuid()}.${fileExtension}`;
            file.mv(`${destination}/${fileName}`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async uploadMultipleFile(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png','jpg','jpeg','gif']
    ){
        
    }

    
}