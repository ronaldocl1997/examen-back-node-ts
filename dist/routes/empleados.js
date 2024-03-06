"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const empleados_1 = require("../controllers/empleados");
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(); // Configuración multer
//obetener todos los empleados sin paginar
router.get('/list', upload.none(), empleados_1.getEmpleadosList);
//obtener todos los empleados con paginacion
const getFormDataMiddleware = body_parser_1.default.urlencoded({ extended: true }); // Or use multer configuration
router.post('/page', empleados_1.getEmpleadosPage);
//crear un empleado
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fechaNacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('edad', 'La edad es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('cargoId', 'El cargoId es obligatorio').not().isEmpty(),
    validar_campos_1.default
], empleados_1.postEmpleado);
router.put('/:id', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fechaNacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('edad', 'La edad es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('cargoId', 'El cargoId es obligatorio').not().isEmpty(),
    validar_campos_1.default
], empleados_1.putEmpleado);
//eliminar  un empleado cambiando status
router.delete('/:id', [], empleados_1.deleteEmpleado);
//eliminar  un empleado en la bd
router.delete('/bd/:id', [], empleados_1.deleteBdEmpleado);
exports.default = router;
//# sourceMappingURL=empleados.js.map