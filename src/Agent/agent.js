'use strict';

const net = require('net');

const socket = new net.Socket();

var tmp = '';

const send = message => {
    console.log('Client >', message);
    socket.write(message);
};

socket.on('data', data => {
    console.log('Server >', data.toString(), data);
    if(data.toString() != '200') {
        socket.emit('error', new Error('Error status server not 200!'));
    }
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
    send('1' + i);
});

socket.on('timeout', () => {
    console.log('Event: ⌛');
});

var i = 0;
socket.on('connect', () => {

    setInterval(function() {i++;     tmp = '1' + i;  send('1' + i) }, 2000);
    send('1');
    send('2');
    send('3');
});

socket.connect({
    port: 2002,
    host: '127.0.0.1',
});