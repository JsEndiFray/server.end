import {DataTypes} from "sequelize";
import db from "../db/dbConnection";

export const Contact = db.define("contact", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})