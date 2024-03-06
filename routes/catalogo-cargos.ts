import { Router } from 'express'
import { check } from 'express-validator';
import validarCampos from '../middlewares/validar-campos';
import { existeDescripcionCatalogoCargos } from '../helpers/db-validators';
import { deleteBdCatalogoCargos, deleteCatalogoCargos, getCatalogosCargosList, getCatalogosCargosPage, postCatalogoCargos, putCatalogoCargos } from '../controllers/catalogo-cargos';
import multer from 'multer';

const router = Router();

const upload = multer(); // Configuración multer

//obetener todas catalogos sin paginar
router.get('/list', upload.none(),getCatalogosCargosList);

//obetener todas catalogos con paginacion
router.get('/page', upload.none(), getCatalogosCargosPage);

//crear un catalgo
router.post('/',[
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('descripcion').custom(existeDescripcionCatalogoCargos),
    validarCampos
],postCatalogoCargos);

//actualizar un catalogo
router.put('/:id',[
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('descripcion').custom(existeDescripcionCatalogoCargos),
    validarCampos
],putCatalogoCargos);

//eliminar  un catalogo cambiando status
router.delete('/:id',[
    
],deleteCatalogoCargos);

//eliminar  un catalogo en la bd
router.delete('/bd/:id',[
    
],deleteBdCatalogoCargos);

export default router;

