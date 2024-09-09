import {Request, Response} from "express";
import {Product} from "../models/productosModels";

// Configuracion de los controladores de los productos.

//Consulta de los prodcutos.
export const getProducts = async (req: Request, res: Response) => {
    try {
        const listProduct = await Product.findAll();
        if (listProduct.length === 0) {
            return res.status(400).json({msg: 'Lo sentimos no tenemos stock de los productos.'});
        }
        res.json({msg: 'Esta es la lista de productos.', products: listProduct});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error interno del servidor.'});
    }
}

//Consulta del producto en la base de datos.
export const getProduct = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await Product.findByPk(id);
    if (product) {
        res.json({msg: 'Consulta del Producto.', product});
    } else {
        res.status(404).json({msg: `El producto no existe con el id ${id}`})
    }
}

//Crear Producto
export const postProduct = async (req: Request, res: Response) => {
    const {name, description, price, stock} = req.body;
    if (!name || !description || !price || !stock ) {
        return res.status(400).json({error: 'Tiene que ser name, description, price y stock para el registro.'})
    }
    try {
        // En busca de productos existentes.
        const productExists = await Product.findOne({where: {description}});
        if (productExists) {
            return res.status(400).json({error: 'El producto ya existe en la base de datos.'})
        }
        const newProduct = await Product.create({name, description, price, stock});
        res.json({msg: `El producto ha sido registrado correctamente.`, products: newProduct});
    } catch (error) {
        res.status(404).json(error);
    }
}

// Editar el producto
export const updateProduct = async (req: Request, res: Response) => {
    const {id, name, description, price, stock} = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({msg: `Producto no encontrado con el id ${id}`});
        } else {
            await product.update(({id, name, description, price, stock}));
            res.json({msg: `El producto ha sido modificado correctamente.`});
        }
    } catch (error) {
        res.status(500).json({msg: 'Error al modificar el producto', error});
    }
}

//Eliminar el producto
export const deleteProduct = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({msg: `Producto no encontrado con el id ${id}`});
        } else {
            await product.destroy();
            res.json({msg: 'El producto ha sido eliminado correctamente.'});
        }
    } catch (error) {
        res.status(500).json({msg: 'Error al eliminar el producto',})
    }
}

