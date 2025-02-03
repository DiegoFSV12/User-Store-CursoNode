import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../service/auth.service';




export class AuthRoutes {


static get routes(): Router {

    const router = Router();
    const autheService = new AuthService();
    const controller = new AuthController(autheService);
    // Definir las rutas
    router.post('/login', controller.loginUser);
    router.post('/register', controller.register );
    router.get('/validate-email/:token', controller.validateEmail);



    return router;
}


}

