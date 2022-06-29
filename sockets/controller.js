
const socketController = (socket) => {

    console.log('cliente conectado', socket.id );

    // detectar estado de conexion offline, lado del servidor
    socket.on( 'disconnect', () => {

        // console.log('cliente desconectado', socket.id );

    });

    socket.on( 'enviar-mensaje', ( payload, callback ) => {//aqui el servidor recibe el payload que envio el cliente

        const id = 123456;
        callback({ id, fecha: new Date().getTime() });

        // console.log('enviar mensaje desde server.js');
        // console.log( payload );

        // this.io.emit('enviar-mensaje', 'enviar-mensaje desde el server.js');
        // this.io.emit('enviar-mensaje', payload );

        socket.broadcast.emit('enviar-mensaje', payload );
        // broadcast es para que el usuario emita el mensaje a todos los demas usuarios

        // aqui el servidor muestra en consola el payload que envio el cliente,
        // pero tambien ese payload podra verlo todos los usuarios ya que
        // el servidor esta enviando el payload a todos los usuarios

    });

}

module.exports = {

    socketController
}