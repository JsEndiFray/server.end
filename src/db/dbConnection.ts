import {Sequelize} from 'sequelize';

//Se configura la conexion a sql a la bbdd
const db = new Sequelize( 'dbdatos', 'root', 'root',{
    host: 'localhost',
    dialect: "mysql",
});

export default db;