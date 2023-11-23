const express = require('express');
const app = express();
const http = require('http');
const { Socket } = require('socket.io');
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = 3000;

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (Socket) => {
    console.log('ユーザーが接続しました。')

    Socket.on('chat message', (msg) => {
        console.log('メッセージ:' + msg);
        io.emit('chat message', msg);
    });
});


server.listen(process.env.PORT || 3000, ()=> {
    console.log('listening on 3000');
});