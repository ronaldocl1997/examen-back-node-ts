import { Router } from 'express'
import { check } from 'express-validator';
import validarCampos from '../middlewares/validar-campos';
import { deleteBdEmpleado, deleteEmpleado, getEmpleadosList, getEmpleadosPage, postEmpleado, putEmpleado } from '../controllers/empleados';
import multer from 'multer';
import bodyParser from 'body-parser';

const router = Router();

const upload = multer(); // Configuración multer

//obetener todos los empleados sin paginar
router.get('/list',upload.none(),getEmpleadosList);

//obtener todos los empleados con paginacion
const getFormDataMiddleware = bodyParser.urlencoded({ extended: true }); // Or use multer configuration

router.post('/page',getEmpleadosPage);

//crear un empleado
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('apellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('cargoId', 'El cargoId es obligatorio').not().isEmpty(),
    validarCampos
],postEmpleado);

router.put('/:id',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('apellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('cargoId', 'El cargoId es obligatorio').not().isEmpty(),
    validarCampos
],putEmpleado);

//eliminar  un empleado cambiando status
router.delete('/:id',[
    
],deleteEmpleado);

//eliminar  un empleado en la bd
router.delete('/bd/:id',[
    
],deleteBdEmpleado);

export default router;
