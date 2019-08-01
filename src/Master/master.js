'use strict';

const net = require('net');

const logger = require('./loging');

const connection = socket => {

    console.dir({
        localAddress: socket.localAddress,
        localPort: socket.localPort,
        remoteAddress: socket.remoteAddress,
        remoteFamily: socket.remoteFamily,
        remotePort: socket.remotePort,
        bufferSize: socket.bufferSize,
    });
    // log.info(socket.connected + port + ".");

    logger.info('new connection - ', socket.remoteAddress, ' accepted at ', new Date().toJSON());

    socket.write('💗!!!!!💗');

    socket.on('data', data => {
        console.log('Event: 📨', data);
        console.log('Data:', data.toString());
        logger.info('new raw - ' + data.toString(), socket.remoteAddress, ' accepted at ', new Date().toJSON());
        socket.write('200');
    });



    socket.on('drain', () => {
        console.log('Event: 🤷');
    });

    socket.on('end', () => {
        console.log('Event: 🏁');
        console.dir({
            bytesRead: socket.bytesRead,
            bytesWritten: socket.bytesWritten,
        });
    });

    socket.on('error', err => {
        console.log('Event: 💩');
        console.log(err);
    });

    socket.on('timeout', () => {
        console.log('Event: ⌛');
    });

};

function initSocket(bool){
    if(bool == true){
        const server = net.createServer();

        server.on('connection', connection);

        server.listen(2002);
    }else{
        server.emit('discnnect');
    }
}

var flag = false;

const server = net.createServer();

server.on('connection', connection);

server.listen(2002);

setTimeout(function(flag){initSocket(flag)}, 5000);
