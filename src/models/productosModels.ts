import {DataTypes} from "sequelize";
import db from "../db/dbConnection";

//Asignamos el modelo de producto de sequelize y definimos para la conexion a la BBDD
export const Product = db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.DOUBLE,
    },
    stock: {
        type: DataTypes.INTEGER
    }
});