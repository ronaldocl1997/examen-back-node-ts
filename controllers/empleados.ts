import { Request, Response } from "express";

//importacion del modelo empleados
import Empleados from '../models/empleados';
import CatalogoCargos from "../models/catalogo-cargos";

import { Op } from 'sequelize';


export const getEmpleadosPage = async (req: Request, res: Response) => {
    let { size = 10, page = 1, sortBy = 'id', direction = 'DESC', nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, edad, cargo, id } = req.body;

    size = parseInt(size);
    page = parseInt(page);
    const offset: number = (page - 1) * size;
    direction = direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    size = size > 0 ? size : 10;
    page = page > 0 ? page : 1;

    // Construir el objeto 'where' dinámicamente
    let where: any = {};
    
    if (id) {
        where.id = { [Op.like]: `%${id}%` };
    }

    if (nombre) {
        where.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (apellidoPaterno) {
        where.apellidoPaterno = { [Op.like]: `%${apellidoPaterno}%` };
    }

    if (apellidoMaterno) {
        where.apellidoMaterno = { [Op.like]: `%${apellidoMaterno}%` };
    }

    if (fechaNacimiento) {
        where.fechaNacimiento = fechaNacimiento;
    }

    if (edad) {
        where.edad = edad;
    }

    if (cargo) {
        where['$cargo.descripcion$'] = { [Op.like]: `%${cargo}%` };
    }

    try {
        const empleados = await Empleados.findAndCountAll({
            limit: size,
            offset: offset,
            order: [[sortBy, direction]],
            where: where,
            include: [{ model: CatalogoCargos, as: 'cargo' }]
        });

        const totalPaginas = Math.ceil(empleados.count / size);

        res.status(200).json({
            datos: empleados.rows,
            totalRegistros: empleados.count,
            totalPaginas: totalPaginas,
            paginaActual: page,
            registrosPorPagina: size
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los empleados, hable con el administrador',
            error
        });
    }
};

export const getEmpleadosList = async (req: Request, res: Response) => {
    const { sortBy = 'id', direction = 'DESC' } = req.body;

    try {
        const empleados = await Empleados.findAll({
            order: [[sortBy, direction]],
            where: {
                estado: true
            },
            include: [{ model: CatalogoCargos, as: 'cargo' }] // Incluye la información del catálogo de cargos
        });

        res.status(200).json({
            datos: empleados,
            totalRegistros: empleados.length,
            sortBy: sortBy,
            direction: direction
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los empleados. Por favor, hable con el administrador.',
            error
        });
    }
};

export const postEmpleado = async( req: Request, res: Response) =>{

    try {

        const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, edad, cargoId} = req.body;

        const data = {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            fechaNacimiento,
            edad,
            cargoId
        };

        //construir el modelo de catalogoCargos
        const empleado = Empleados.build(data);

        await empleado.save();

        res.status(201).json({
            msg: "Empleado creado con exito",
            empleado
        });

    } catch (error) {
        res.status(500).json({
            msg : 'hable con el administrador',
            error: error
        });
    };

};

export const putEmpleado = async ( req: Request, res: Response) =>{

    try {

        const { id } = req.params;
        const { body } = req;
    
        const empleadoExiste = await Empleados.findByPk(id);
    
        if(!empleadoExiste){
            return res.status(400).json({
                mgs: "No existe el empleado con el id: " + id
            })
        };

         // Verifica si el estado ya está en false
         /* if (!empleadoExiste.get('estado')) {
            return res.status(400).json({
                msg: "El empleado con el id: " + id + " ya ha sido eliminado previamente."
            });
        }; */
    
        //se elimina cambiando de estado
        await empleadoExiste.update(body)
    
    
        res.json({
            msg : 'El empleado con el id :' + id + " ha sido actualizado",
            body,
        });

    } catch (error) {
        res.status(500).json({
            msg : 'hable con el administrador',
            error: error
        })
    }
};

export const deleteEmpleado = async ( req: Request, res: Response) =>{

    try {

        const { id } = req.params;
    
        const empleadoExiste = await Empleados.findByPk(id);
    
        if(!empleadoExiste){
            return res.status(400).json({
                mgs: "No existe el empleado con el id: " + id
            })
        };

         // Verifica si el estado ya está en false
         if (!empleadoExiste.get('estado')) {
            return res.status(400).json({
                msg: "El empleado con el id: " + id + " ya ha sido eliminado previamente."
            });
        };
    
        //se elimina cambiando de estado
        await empleadoExiste.update({ estado: false})
    
    
        res.json({
            msg : 'El empleado con el id :' + id + " ha sido eliminado",
        });

    } catch (error) {
        res.status(500).json({
            msg : 'hable con el administrador',
            error: error
        })
    }
};

export const deleteBdEmpleado = async ( req: Request, res: Response) =>{

    try {

        const { id } = req.params;
    
        const empleadoExiste = await Empleados.findByPk(id);
    
        if(!empleadoExiste){
            return res.status(400).json({
                mgs: "No existe el empleado con el id: " + id
            })
        };
    
        //se elimina cambiando de estado
        await empleadoExiste.destroy();
    
    
        res.json({
            msg : 'El empleado con el id :' + id + " ha sido eliminado",
        });

    } catch (error) {
        res.status(500).json({
            msg : 'hable con el administrador',
            error: error
        })
    }
};