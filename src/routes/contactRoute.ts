import {Router} from 'express';
import {postContact} from "../controllers/contactControllers";

const router = Router()
    .post('/', postContact)


export default router;