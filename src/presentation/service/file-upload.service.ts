import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from 'fs';

export class FileUploadService{
    constructor(){}

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
            const fileExtension = file.mimetype.split('/').at(1);//Corta el mimetype para obtener el tipo de archivo (png,jpg,jpeg...)
            const destination = path.resolve(__dirname,'../../../',folder);
            this.checkFolder(destination);
            file.mv(destination+`/my-image.${fileExtension}`);
        } catch (error) {
            console.log(error);
        }
    }

    async uploadMultipleFile(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png','jpg','jpeg','gif']
    ){
        
    }

    
}