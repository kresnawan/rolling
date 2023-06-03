const {server, io, app} = require("./server");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./router/router.js");
const connection = require("./db/database.js");

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

connection.connect(err =>{
    if (err) {
        return console.log(err);
    }

    console.log("MySQL connected");
})

io.on('connection', (socket) =>{
    console.log('A user connected');
    socket.on('disconnect', () =>{
        console.log('A user disconnected')
    });
});

server.listen(8000, () =>{
    console.log("Server successfully runned");
});