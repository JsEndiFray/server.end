import express from 'express';
import cors from 'cors';
import productRoute from "../routes/productRoute";
import userRoute from "../routes/userRoute";
import {Product} from "./productosModels";
import {User} from "./userModels";
import contactRoute from "../routes/contactRoute";
import {Contact} from "./contactModels";

// Se inicializa las variables para ser llamadas con el constructor para cada metodo.
class Server {

    private app: express.Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4001';
        this.listen();
        this.middleware();
        this.routes();
        this.dbConnect();
    }

    //Definiendo los metodos:

    middleware() {
        //Parsear el body.
        this.app.use(express.json());
        //Permisos
        this.app.use(cors());
    }

    //Definiendo las rutas
    routes() {
        this.app.use('/product', productRoute);
        this.app.use('/user', userRoute);
        this.app.use('/contact', contactRoute);
    }

    // Activar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El Servidor se esta ejecutando en el puerto => ${this.port}...`)
        })
    }

    //Conectar con la BBDD
    async dbConnect() {
        try {
            await Product.sync()
            await User.sync()
            await Contact.sync()
        } catch (error) {
            console.error(`No ha podido conectar a la Base de Datos. ${error}`);

        }
    }
}

export default Server;