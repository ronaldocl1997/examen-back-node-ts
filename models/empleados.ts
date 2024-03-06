import { DataTypes } from "sequelize";
import sequelize from "sequelize";
import db from "../db/connection";
import CatalogoCargos from "./catalogo-cargos";

const Empleado = db.define('Empleado', {

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  apellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  apellidoMaterno: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  edad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('CURRENT_TIMESTAMP'),
  },

  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  
});

// Relación con el modelo CatalogoCargos
Empleado.belongsTo(CatalogoCargos, {
  foreignKey: {
    name: 'cargoId',
    allowNull: true,
  },
  as: 'cargo',
});

(async () => {
  try {
    // Sincronizar el modelo Empleado
    await Empleado.sync();
    console.log('Modelo Empleado sincronizado correctamente');
  } catch (error) {
    console.error('Error al sincronizar modelo Empleado:', error);
  }
})();

export default Empleado;