//importamos el model de catalogo-cargos
import CatalogoCargos from "../models/catalogo-cargos";


//validacion para ver si existe una descripcion con el mismo nombre en catalogo-cargos
const existeDescripcionCatalogoCargos = async(descripcion = '') => {


    const existeCatalogo = await CatalogoCargos.findOne(
        {
            where: {
                descripcion
            }
        }
    );

    if(existeCatalogo){
        throw new Error(`El catalogo ${descripcion} ya existe`);
    };
    
};



export 
    {
        existeDescripcionCatalogoCargos
    }