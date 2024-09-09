import {Request, Response} from "express";
import {Contact} from "../models/contactModels";


export const postContact = async (req: Request, res: Response) => {
    const {name, email, message} = req.body;
    if (!name || !email || !message) {
        res.status(400).json({error: 'Tiene que completar: Nombre, Email y Mensaje '})
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(500).json({msg: 'El correo electronico no es valido.'})
    }
    try {
        const NewMessage = await Contact.create({name, email, message});
        res.status(201).json({msg: 'Mensaje enviado correctamente', contact: NewMessage});
    } catch (error) {
        res.status(500).json({msg: 'Pruebe enviar el mensaje mas adelante, disculpe las molestias', error:error});
    }


}