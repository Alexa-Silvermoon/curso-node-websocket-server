
const express = require('express');// servidor express
const cors = require('cors'); //autoriza o no paginas web que entren a mi server
const { socketController } = require('../sockets/controller');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT; //desde app.js require('dotenv').config();// trae los del archivo .env

        this.server = require('http').createServer( this.app ); //para el socket.io
        this.io = require('socket.io')( this.server );

        this.paths = {}

        // Middlewares es una funcion que se ejecuta cada vez que levantamos el servidor
        this.middlewares();

        // Rutas de mi App
        this.routes();

        //sockets
        this.sockets();

    }

    middlewares(){ //funcion que se ejecuta antes de llamar a un controlador o seguir con ejecucion de peticiones

        // CORS
        this.app.use( cors());

        // Directorio Publico
        this.app.use( express.static('public') );//.use me ayuda a saber de se trata de un middleware
        //apuntando a la carpeta publica, es decir al index.html

    }

    routes(){

        // this.app.use( this.paths.auth, require('../routes/auth.js'));

    }

    sockets(){

        // detectar estado de conexion online, lado del servidor
        this.io.on('connection', socketController );

    }

    listen(){

        this.server.listen(this.port, () => {

            console.log('Servidor corriendo en el puerto', this.port);

        });

    }
    
}

module.exports = Server;

//verificar que la configuracion basica del servedor socket.io esta funcionando bien:
// http://localhost:8080/socket.io/socket.io.js