"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const connection_1 = __importDefault(require("../db/connection"));
const catalogo_cargos_1 = __importDefault(require("./catalogo-cargos"));
const Empleado = connection_1.default.define('Empleado', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellidoPaterno: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellidoMaterno: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fechaNacimiento: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    edad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_2.default.fn('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
});
// Relación con el modelo CatalogoCargos
Empleado.belongsTo(catalogo_cargos_1.default, {
    foreignKey: {
        name: 'cargoId',
        allowNull: true,
    },
    as: 'cargo',
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sincronizar el modelo Empleado
        yield Empleado.sync();
        console.log('Modelo Empleado sincronizado correctamente');
    }
    catch (error) {
        console.error('Error al sincronizar modelo Empleado:', error);
    }
}))();
exports.default = Empleado;
//# sourceMappingURL=empleados.js.map