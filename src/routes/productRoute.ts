import {Router} from 'express';
import {deleteProduct, getProduct, getProducts, postProduct, updateProduct,} from "../controllers/productControllers";
import validateToken from "./tokensRoute";


// Configuracion de las rutas de productos.
const router = Router()
    .get('/', validateToken,getProducts)
    .get('/:id', getProduct)
    .post('/', postProduct)
    .put('/:id', updateProduct)
    .delete('/:id', deleteProduct)

export default router;