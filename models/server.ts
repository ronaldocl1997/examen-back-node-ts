import express, {Application} from 'express';
import cors from 'cors';
import db from '../db/connection';

//importaciones de mi carpeta routes
import catalogoCargosRoutes from '../routes/catalogo-cargos';
import empleadoRoutes from '../routes/empleados';


class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
        empleados: '/api/empleados',
        catalogoCargos: '/api/catalogo-cargos',
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.dbConnection();
        this.middlewares();
        this.routes();
    };

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("base de datos online")
        } catch (error) {
            if (typeof error === 'string') {
                throw new Error(error);
            } else {
                throw new Error('Error desconocido');
            }
        }
    };

    middlewares() {
        
        // cors
        this.app.use(cors());

        // Lectura del body
        this.app.use( express.json());

        //carga carpeta publica
        this.app.use ( express.static('public'));

    };

    routes() {
        this.app.use(this.apiPaths.catalogoCargos, catalogoCargosRoutes);
        this.app.use(this.apiPaths.empleados, empleadoRoutes);
    };

    listen(){
        this.app.listen( this.port, () =>{
            console.log('El servidor corriendo en puerto:' + this.port);
        } );
    };

};

export default Server;