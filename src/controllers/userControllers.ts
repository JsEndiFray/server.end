import {Request, Response} from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from "../models/userModels";
import {IUserModel} from "../interface/userInterface";

// Configuracion de los controladores de Usuarios asincrona.
export const userNew = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    //Validamos si el usuario si es existente.
    const user: IUserModel | null = await User.findOne({where: {username: username}})
    if (user) {
        return res.status(400).json({msg: `Ya existe el usuario con el nombre ${username}`});
    }

    //Aqui hasheamos la contraseña.
    const hashedPassword = await bcrypt.hash(password, 10);
// Crear el usuario configurando el error si existe.
    try {
        await User.create({username: username, password: hashedPassword});
        res.status(201).json({msg: `El usuario ${username} ha sido creado correctamente`});
    } catch (error) {
        res.status(400).json( {msg:'Lo sentimos ha ocurrido un error.',error:error});
    }
}


//Configuracion del Login y de los tokens

export const loginNew = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    //Validamos si el usuario si es existente en la BBDD

    const user: IUserModel | null = await User.findOne({where: {username: username}});
    if (!user) {
        return res.status(404).json({msg: `No existe el usuario con el nombre ${username}`});
    }

    //Validacion del password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        return res.status(404).json({msg: 'Contraseña incorrecta'});
    }

    // Tokens generados
    const token = jwt.sign({username: username}, process.env.SECRET_CODE || 'end1234');
    res.json({token});
}
