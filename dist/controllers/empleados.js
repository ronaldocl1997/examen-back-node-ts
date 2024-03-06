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
exports.deleteBdEmpleado = exports.deleteEmpleado = exports.putEmpleado = exports.postEmpleado = exports.getEmpleadosList = exports.getEmpleadosPage = void 0;
//importacion del modelo empleados
const empleados_1 = __importDefault(require("../models/empleados"));
const catalogo_cargos_1 = __importDefault(require("../models/catalogo-cargos"));
const sequelize_1 = require("sequelize");
const getEmpleadosPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { size = 10, page = 1, sortBy = 'id', direction = 'DESC', nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, edad, cargo, id } = req.body;
    size = parseInt(size);
    page = parseInt(page);
    const offset = (page - 1) * size;
    direction = direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    size = size > 0 ? size : 10;
    page = page > 0 ? page : 1;
    // Construir el objeto 'where' dinámicamente
    let where = {};
    if (id) {
        where.id = { [sequelize_1.Op.like]: `%${id}%` };
    }
    if (nombre) {
        where.nombre = { [sequelize_1.Op.like]: `%${nombre}%` };
    }
    if (apellidoPaterno) {
        where.apellidoPaterno = { [sequelize_1.Op.like]: `%${apellidoPaterno}%` };
    }
    if (apellidoMaterno) {
        where.apellidoMaterno = { [sequelize_1.Op.like]: `%${apellidoMaterno}%` };
    }
    if (fechaNacimiento) {
        where.fechaNacimiento = fechaNacimiento;
    }
    if (edad) {
        where.edad = edad;
    }
    if (cargo) {
        where['$cargo.descripcion$'] = { [sequelize_1.Op.like]: `%${cargo}%` };
    }
    try {
        const empleados = yield empleados_1.default.findAndCountAll({
            limit: size,
            offset: offset,
            order: [[sortBy, direction]],
            where: where,
            include: [{ model: catalogo_cargos_1.default, as: 'cargo' }]
        });
        const totalPaginas = Math.ceil(empleados.count / size);
        res.status(200).json({
            datos: empleados.rows,
            totalRegistros: empleados.count,
            totalPaginas: totalPaginas,
            paginaActual: page,
            registrosPorPagina: size
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los empleados, hable con el administrador',
            error
        });
    }
});
exports.getEmpleadosPage = getEmpleadosPage;
const getEmpleadosList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy = 'id', direction = 'DESC' } = req.body;
    try {
        const empleados = yield empleados_1.default.findAll({
            order: [[sortBy, direction]],
            where: {
                estado: true
            },
            include: [{ model: catalogo_cargos_1.default, as: 'cargo' }] // Incluye la información del catálogo de cargos
        });
        res.status(200).json({
            datos: empleados,
            totalRegistros: empleados.length,
            sortBy: sortBy,
            direction: direction
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los empleados. Por favor, hable con el administrador.',
            error
        });
    }
});
exports.getEmpleadosList = getEmpleadosList;
const postEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, edad, cargoId } = req.body;
        const data = {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            fechaNacimiento,
            edad,
            cargoId
        };
        //construir el modelo de catalogoCargos
        const empleado = empleados_1.default.build(data);
        yield empleado.save();
        res.status(201).json({
            msg: "Empleado creado con exito",
            empleado
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'hable con el administrador',
            error: error
        });
    }
    ;
});
exports.postEmpleado = postEmpleado;
const putEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const empleadoExiste = yield empleados_1.default.findByPk(id);
        if (!empleadoExiste) {
            return res.status(400).json({
                mgs: "No existe el empleado con el id: " + id
            });
        }
        ;
        // Verifica si el estado ya está en false
        /* if (!empleadoExiste.get('estado')) {
           return res.status(400).json({
               msg: "El empleado con el id: " + id + " ya ha sido eliminado previamente."
           });
       }; */
        //se elimina cambiando de estado
        yield empleadoExiste.update(body);
        res.json({
            msg: 'El empleado con el id :' + id + " ha sido actualizado",
            body,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'hable con el administrador',
            error: error
        });
    }
});
exports.putEmpleado = putEmpleado;
const deleteEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const empleadoExiste = yield empleados_1.default.findByPk(id);
        if (!empleadoExiste) {
            return res.status(400).json({
                mgs: "No existe el empleado con el id: " + id
            });
        }
        ;
        // Verifica si el estado ya está en false
        if (!empleadoExiste.get('estado')) {
            return res.status(400).json({
                msg: "El empleado con el id: " + id + " ya ha sido eliminado previamente."
            });
        }
        ;
        //se elimina cambiando de estado
        yield empleadoExiste.update({ estado: false });
        res.json({
            msg: 'El empleado con el id :' + id + " ha sido eliminado",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'hable con el administrador',
            error: error
        });
    }
});
exports.deleteEmpleado = deleteEmpleado;
const deleteBdEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const empleadoExiste = yield empleados_1.default.findByPk(id);
        if (!empleadoExiste) {
            return res.status(400).json({
                mgs: "No existe el empleado con el id: " + id
            });
        }
        ;
        //se elimina cambiando de estado
        yield empleadoExiste.destroy();
        res.json({
            msg: 'El empleado con el id :' + id + " ha sido eliminado",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'hable con el administrador',
            error: error
        });
    }
});
exports.deleteBdEmpleado = deleteBdEmpleado;
//# sourceMappingURL=empleados.js.map