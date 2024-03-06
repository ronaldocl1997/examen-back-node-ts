"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const db_validators_1 = require("../helpers/db-validators");
const catalogo_cargos_1 = require("../controllers/catalogo-cargos");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(); // Configuración multer
//obetener todas catalogos sin paginar
router.get('/list', upload.none(), catalogo_cargos_1.getCatalogosCargosList);
//obetener todas catalogos con paginacion
router.get('/page', upload.none(), catalogo_cargos_1.getCatalogosCargosPage);
//crear un catalgo
router.post('/', [
    (0, express_validator_1.check)('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('descripcion').custom(db_validators_1.existeDescripcionCatalogoCargos),
    validar_campos_1.default
], catalogo_cargos_1.postCatalogoCargos);
//actualizar un catalogo
router.put('/:id', [
    (0, express_validator_1.check)('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('descripcion').custom(db_validators_1.existeDescripcionCatalogoCargos),
    validar_campos_1.default
], catalogo_cargos_1.putCatalogoCargos);
//eliminar  un catalogo cambiando status
router.delete('/:id', [], catalogo_cargos_1.deleteCatalogoCargos);
//eliminar  un catalogo en la bd
router.delete('/bd/:id', [], catalogo_cargos_1.deleteBdCatalogoCargos);
exports.default = router;
//# sourceMappingURL=catalogo-cargos.js.map