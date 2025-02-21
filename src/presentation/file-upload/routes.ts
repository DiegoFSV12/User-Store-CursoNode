import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../service/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';


export class FileUploadRoutes {


static get routes(): Router {

    const router = Router();
    const service = new FileUploadService();
    const controller = new FileUploadController(service);

    router.use(FileUploadMiddleware.containFiles);
    // Definir las rutas
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFile);


    return router;
}


}

