import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    // es para poder entrar en la autorizacion del token
    const headerToken = req.headers["authorization"];
    if (headerToken != undefined && headerToken.startsWith("Bearer")) {
        // Verificando el token.
        try {
            //  el metodo slice sirve para contar los caracteres desde el 7 en adelante
            const bearerToken = headerToken.slice(7);
            // metodo verify => para verificar el token
            jwt.verify(bearerToken, process.env.SECRET_CODE || "end1234");
            next();
        } catch (error) {
            res.status(401).json({msg: 'Token no valido.'});
        }
    } else {
        res.status(401).json({msg: "Acceso denegado",});
    }
};
export default validateToken;
