import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../service/category.service';


export class CategoryRoutes {


static get routes(): Router {

    const router = Router();
    const service = new CategoryService();
    const controller = new CategoryController(service);

    // Definir las rutas
    router.get('/', controller.getCategories);
    router.post('/', [AuthMiddleware.validateJWT],controller.createCategory);//Con el AuthMiddleware verificamos que haiga una sesión iniciada mediante el token que se genera y se guarda al usuario en la request



    return router;
}


}

