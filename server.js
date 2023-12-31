const express= require('express');
const app= express();
const http=require('http');
const server=http.createServer(app);
const {Server} = require('socket.io');
const io=new Server(server);

app.use(express.static('public'));
const users={}

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

var i=0;
io.on('connection',(socket)=>{
    i++;
    console.log(`${i}: user connected to server `);
    socket.on('new-user-joined',(name)=>{
        console.log(`${name} joined`);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id])
        delete users[socket.id];
    })
})


server.listen(3000,()=>{
    console.log('listening on port 5000');
})