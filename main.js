const express = require("express");
const http = require("http");
const cors = require("cors")
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors({origin: "*"}))

app.get('/', (req, res) =>{
    res.send('API successfully called!');
});

io.on('connection', (socket) =>{
    console.log('A user connected');
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    })
})

server.listen(8000, () =>{
    console.log("Server successfully runned");
});