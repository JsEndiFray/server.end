import {Router} from 'express';
import {loginNew, userNew} from "../controllers/userControllers";

//Se crea una instancia del enrutador. para crear y inicio del usuario
const router = Router()
    .post('/', userNew)
    .post('/login', loginNew)


export default router;
