import { Request, Response } from "express"

//importacion del modelo catalogo-cargos
import CatalogoCargos from '../models/catalogo-cargos';

export const getCatalogosCargosPage = async (req: Request, res: Response) => {

    let { size = 10, page = 1, sortBy = 'id', direction = 'DESC' } = req.body;

    // Convertir a los tipos adecuados
    size = parseInt(size);
    page = parseInt(page);
    const offset: number = (page - 1) * size;

    // Validar el parámetro 'direction' para asegurar que solo acepte 'ASC' o 'DESC'
    direction = direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'; // Asegura que direction solo sea 'ASC' o 'DESC'

    // Asegurar que los valores son razonables
    size = size > 0 ? size : 10;
    page = page > 0 ? page : 1;

    try {
        const catalogosCargos = await CatalogoCargos.findAndCountAll({
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
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los catálogos de cargos hable con el administrador',
            error
        });
    }
};

export const getCatalogosCargosList = async (req: Request, res: Response) => {
    const { sortBy = 'id', direction = 'DESC' } = req.body;

    try {
        const catalogosCargos = await CatalogoCargos.findAll({
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
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los catálogos de cargos. Por favor, hable con el administrador.',
            error
        });
    }
};

export const postCatalogoCargos = async( req: Request, res: Response) =>{

    try {

        const descripcion = req.body.descripcion.toUpperCase();

        const data = {
            descripcion
        };

        //construir el modelo de catalogoCargos
        const catalogoCargos = CatalogoCargos.build(data);

        await catalogoCargos.save();

        res.status(201).json({
            msg: "Catalogo creado con exito",
            catalogoCargos
        });

    } catch (error) {
        res.status(500).json({
            msg : 'hable con el administrador',
            error: error
        });
    };

};

export const putCatalogoCargos = async ( req: Request, res: Response) =>{

    try {

        const { id } = req.params;
        const { body } = req;

        body.descripcion = body.descripcion.toUpperCase();
    
        const catalogoExiste = await CatalogoCargos.findByPk(id);
    
        if(!catalogoExiste){
            return res.status(400).json({
                mgs: "No existe el catalogo con el id: " + id
            })
        };

         // Verifica si el estado ya está en false
         if (!catalogoExiste.get('estado')) {
            return res.status(400).json({
                msg: "El catálogo con el id: " + id + " ya ha sido eliminado previamente."
            });
        };
    
        //se elimina cambiando de estado
        await catalogoExiste.update(body)
    
    
        res.json({
            msg : 'El catalogo con el id :' + id + " ha sido actualizado",
            body,
        });

    } catch (error) {
        res.status(500).json({
            msg : 'hable con el administrador',
            error: error
        })
    }
};

export const deleteCatalogoCargos = async ( req: Request, res: Response) =>{

    try {

        const { id } = req.params;
    
        const catalogoExiste = await CatalogoCargos.findByPk(id);
    
        if(!catalogoExiste){
            return res.status(400).json({
                mgs: "No existe el catalogo con el id: " + id
            })
        };

         // Verifica si el estado ya está en false
         if (!catalogoExiste.get('estado')) {
            return res.status(400).json({
                msg: "El catálogo con el id: " + id + " ya ha sido eliminado previamente."
            });
        };
    
        //se elimina cambiando de estado
        await catalogoExiste.update({ estado: false})
    
    
        res.json({
            msg : 'El catalogo con el id :' + id + " ha sido eliminado",
        });

    } catch (error) {
        res.status(500).json({
            msg : 'hable con el administrador',
            error: error
        })
    }
};

export const deleteBdCatalogoCargos = async ( req: Request, res: Response) =>{

    try {

        const { id } = req.params;
    
        const catalogoExiste = await CatalogoCargos.findByPk(id);
    
        if(!catalogoExiste){
            return res.status(400).json({
                mgs: "No existe el catalogo con el id: " + id
            })
        };

        //se elimina cambiando de estado
        await catalogoExiste.destroy();
    
    
        res.json({
            msg : 'El catalogo con el id :' + id + " ha sido eliminado",
        });

    } catch (error) {
        res.status(500).json({
            msg : 'hable con el administrador',
            error: error
        })
    }
};
