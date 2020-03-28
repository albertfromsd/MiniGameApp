// [ EXPRESS ]
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// [ SERVER ]
const server = app.listen(8000, () => {
    console.log("Gameroom App server is listening at Port 8000");
});
// [ CORS ]
const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
// [ COOKIE-PARSER ]
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// [ CONFIG ]
require('./config/mongoose.config');
require('dotenv').config();
console.log("SECRET_KEY: "+process.env.SECRET_KEY);


// [ MODELS ]
// const { Chat } = require('./models/Chat');
// const { User } = require('./models/User');
// const { GameRoom } = require('./models/GameRoom');

// [ ROUTES ]
require('./routes/User.routes')(app);
require('./routes/GameRoom.routes')(app)
require('./routes/Chat.routes')(app);


// [ SOCKET ]

const io = require("socket.io")(server);
let connectedClients = 0;
let chatLog = [];
let userList = [];

io.on("connection", socket => {

    // [ USER LOGIN ]
    connectedClients++;
    console.log(" ");
    console.log("[------LOGIN-----]");
    console.log("User: "+socket.id+" has entered the app!");
    console.log(connectedClients+" of clients are connected");

    chatLog.push({user: "System", message: "[ User "+socket.id+" has entered the room! ]"});
    userList.push(socket.id);

    // [ AUTO REFRESH LOGS/LIST]
    io.emit('refreshChatLog', chatLog);
    io.emit("refreshUserList", userList);

    // [ NEW MESSAGE ]
    socket.on("new message", newMsg => {
        chatLog.push(newMsg);
        io.emit("refreshChatLog", chatLog);
    });

    // [ MATH HEAD ]
    socket.on("enteredMathHead", data => {
        
        socket.on("correctAnswer", data => {
            io.emit("questionAnswered", data);
        });
    });

    // [ USER LOGOUT ]
    socket.on("disconnect", () => {
        connectedClients--;
        userList = userList.filter(user => user != socket.id);
        io.emit("refreshUserList", userList);

        console.log(" ");
        console.log("[------LOGOUT-----]");
        console.log(socket.id+" logged out.");
        console.log(connectedClients+" clients are still connected.");
    });
    
});




