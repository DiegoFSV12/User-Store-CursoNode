import { Router } from 'express';
import { ProductsController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';


export class ProductRoutes {


static get routes(): Router {

    const router = Router();
    const service = new ProductService();
    const controller = new ProductsController(service);

    // Definir las rutas
    router.get('/', controller.getProducts);
    router.post('/', controller.createProducts);



    return router;
}


}

