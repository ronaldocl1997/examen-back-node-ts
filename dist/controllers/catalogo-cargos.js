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
exports.deleteBdCatalogoCargos = exports.deleteCatalogoCargos = exports.putCatalogoCargos = exports.postCatalogoCargos = exports.getCatalogosCargosList = exports.getCatalogosCargosPage = void 0;
//importacion del modelo catalogo-cargos
const catalogo_cargos_1 = __importDefault(require("../models/catalogo-cargos"));
const getCatalogosCargosPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { size = 10, page = 1, sortBy = 'id', direction = 'DESC' } = req.body;
    // Convertir a los tipos adecuados
    size = parseInt(size);
    page = parseInt(page);
    const offset = (page - 1) * size;
    // Validar el parámetro 'direction' para asegurar que solo acepte 'ASC' o 'DESC'
    direction = direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'; // Asegura que direction solo sea 'ASC' o 'DESC'
    // Asegurar que los valores son razonables
    size = size > 0 ? size : 10;
    page = page > 0 ? page : 1;
    try {
        const catalogosCargos = yield catalogo_cargos_1.default.findAndCountAll({
            limit: size,
            offset: offset,
            order: [[sortBy, direction]],
            where: {
                estado: true
            }
        });
        // Calcular el total de páginas
        const totalPaginas = Math.ceil(catalogosCargos.count / size);
        res.status(200).json({
            datos: catalogosCargos.rows,
            totalRegistros: catalogosCargos.count,
            totalPaginas: totalPaginas,
            paginaActual: page,
            registrosPorPagina: size
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los catálogos de cargos hable con el administrador',
            error
        });
    }
});
exports.getCatalogosCargosPage = getCatalogosCargosPage;
const getCatalogosCargosList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy = 'id', direction = 'DESC' } = req.body;
    try {
        const catalogosCargos = yield catalogo_cargos_1.default.findAll({
            order: [[sortBy, direction]],
            where: {
                estado: true
            }
        });
        res.status(200).json({
            datos: catalogosCargos,
            totalRegistros: catalogosCargos.length,
            sortBy: sortBy,
            direction: direction
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los catálogos de cargos. Por favor, hable con el administrador.',
            error
        });
    }
});
exports.getCatalogosCargosList = getCatalogosCargosList;
const postCatalogoCargos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const descripcion = req.body.descripcion.toUpperCase();
        const data = {
            descripcion
        };
        //construir el modelo de catalogoCargos
        const catalogoCargos = catalogo_cargos_1.default.build(data);
        yield catalogoCargos.save();
        res.status(201).json({
            msg: "Catalogo creado con exito",
            catalogoCargos
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
exports.postCatalogoCargos = postCatalogoCargos;
const putCatalogoCargos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        body.descripcion = body.descripcion.toUpperCase();
        const catalogoExiste = yield catalogo_cargos_1.default.findByPk(id);
        if (!catalogoExiste) {
            return res.status(400).json({
                mgs: "No existe el catalogo con el id: " + id
            });
        }
        ;
        // Verifica si el estado ya está en false
        if (!catalogoExiste.get('estado')) {
            return res.status(400).json({
                msg: "El catálogo con el id: " + id + " ya ha sido eliminado previamente."
            });
        }
        ;
        //se elimina cambiando de estado
        yield catalogoExiste.update(body);
        res.json({
            msg: 'El catalogo con el id :' + id + " ha sido actualizado",
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
exports.putCatalogoCargos = putCatalogoCargos;
const deleteCatalogoCargos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const catalogoExiste = yield catalogo_cargos_1.default.findByPk(id);
        if (!catalogoExiste) {
            return res.status(400).json({
                mgs: "No existe el catalogo con el id: " + id
            });
        }
        ;
        // Verifica si el estado ya está en false
        if (!catalogoExiste.get('estado')) {
            return res.status(400).json({
                msg: "El catálogo con el id: " + id + " ya ha sido eliminado previamente."
            });
        }
        ;
        //se elimina cambiando de estado
        yield catalogoExiste.update({ estado: false });
        res.json({
            msg: 'El catalogo con el id :' + id + " ha sido eliminado",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'hable con el administrador',
            error: error
        });
    }
});
exports.deleteCatalogoCargos = deleteCatalogoCargos;
const deleteBdCatalogoCargos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const catalogoExiste = yield catalogo_cargos_1.default.findByPk(id);
        if (!catalogoExiste) {
            return res.status(400).json({
                mgs: "No existe el catalogo con el id: " + id
            });
        }
        ;
        //se elimina cambiando de estado
        yield catalogoExiste.destroy();
        res.json({
            msg: 'El catalogo con el id :' + id + " ha sido eliminado",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'hable con el administrador',
            error: error
        });
    }
});
exports.deleteBdCatalogoCargos = deleteBdCatalogoCargos;
//# sourceMappingURL=catalogo-cargos.js.map