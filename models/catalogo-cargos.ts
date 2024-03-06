import { DataTypes } from "sequelize";
import sequelize from "sequelize";
import db from "../db/connection";

const CatalogoCargos = db.define('CatalogoCargos', {

  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
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

(async () => {

    try {
      await CatalogoCargos.sync();
      console.log('Catalogo cargos sincronizado correctamente');
    } catch (error) {
      console.error('Error al sincronizar catalogo cargos:', error);
    }
    
  })();

export default CatalogoCargos;