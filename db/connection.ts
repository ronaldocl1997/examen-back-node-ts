import { Sequelize } from "sequelize";

const db = new Sequelize('examen-back', 'root', '15dejulio', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;