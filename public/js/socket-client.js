
// console.log('hola mundo desde js/socket-client');

//Referencias del HTML:
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

const socket = io();

// detectar estado de conexion online, lado del cliente
socket.on('connect', () => {

    // console.log('conectado - socket-client.js');

    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';

});

// detectar estado de conexion offline, lado del cliente
socket.on('disconnect', () => {

    console.log('desconectado del servidor - socket-client.js');

    lblOnline.style.display  = 'none';
    lblOffline.style.display = '';

});

socket.on('enviar-mensaje', ( payload ) => {

    // console.log('enviar-mensaje desde socket-client.js');
    console.log( payload );
    
});

btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    console.log(mensaje);

    const payload = {

        mensaje,
        id: 'ABC123',
        fecha: new Date().getTime()
    }

    socket.emit( 'enviar-mensaje', payload, (id) => {

        console.log('Desde el server= ', id );
        
    }); //aqui el cliente esta enviando el payload al servidor

});