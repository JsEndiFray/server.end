// Este es el modelo del interface para el Login.
// Utilizo los modelos de sequelize
import {Model, Optional} from "sequelize";

export interface IUser {
    id: number;
    username: string;
    password: string;
}

// Esta interface define los atributos necesarios para crear un nuevo usuario.
export interface IUserFace extends Optional<IUser, 'id'> {
}
// Y este heredera los atributos opcionales del IUserFace
export interface IUserModel extends Model<IUser, IUserFace>, IUserFace {
}