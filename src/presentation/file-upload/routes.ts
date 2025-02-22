import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../service/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';


export class FileUploadRoutes {


static get routes(): Router {

    const router = Router();
    const service = new FileUploadService();
    const controller = new FileUploadController(service);

    router.use(FileUploadMiddleware.containFiles);
    router.use(TypeMiddleware.validTypes(['users','products','categories']));
    // Definir las rutas
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFile);


    return router;
}


}

