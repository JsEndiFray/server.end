import {DataTypes} from "sequelize";
import db from "../db/dbConnection";
import {IUserModel} from "../interface/userInterface";

//Asignamos el modelo de usuario de sequelize y definimos para la conexion a la BBDD
export const User = db.define<IUserModel>("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},)
