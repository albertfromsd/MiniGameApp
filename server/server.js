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
require('./routes/GameRoom.routes')(app);
require('./routes/Chat.routes')(app);


// [ SOCKET ]

const io = require("socket.io")(server);
let connectedClients = 0;
let chatLog = [];
let userList = [];

let miniGame = {
    "roomName" : "",
    "users" : [{
        "name" : "",
        "score" : "",
        "totalTime": ""
    }],
    "users" : [],
    "gameName" : "",
};

let room = "";

io.on("connection", socket => {

    // [ USER LOGIN ]
    connectedClients++;
    console.log(" ");
    console.log("[------LOGIN-----]");
    console.log("User: "+socket.id+" has entered the app!");
    console.log(connectedClients+" of clients are connected");

    chatLog.push({user: "System", message: "[ User "+socket.id+" has entered the room! ]"});
    userList.push(socket.id);

    //[WELCOME]
    socket.emit('welcome', "Socket successfully connected. Happy!!");
    // socket.emit('connect');
    // socket.on('room created', data => {
    //     room = data.roomName;
    //     socket.join(room);
    //     console.log("joined room" +room);
    // })

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
        miniGame.users = [];
        miniGame.roomName = data.roomName;
        miniGame.users.push(data.userName);
        miniGame.gameName = data.gameName;

        console.log(miniGame.users +" inside socket and room name: " +  miniGame.roomName);
        console.log("Squads in game name: " +miniGame.gameName);
        //Share question after generated
        socket.on("mathHeadTargetGenerated", data => {
            io.emit("mathHeadTargetShared", data);
        });
        //Alert players when someone gets it right
        socket.on("correctAnswer", data => {
            io.emit("targetAnswered", data);
        });
    });

     // [ TYPE FASTER MASTER ]
     socket.emit('message', 'what is going on, party people?');
     socket.emit("enteredTypeFaster", data=> {
        miniGame.users = [];
        miniGame.roomName = data.roomName;
        miniGame.users.push(data.userName);

        //Share question after generated
        socket.on("typeFasterTargetGenerated", data => {
            io.emit("typeFasterTargetShared", data);;
        });

        //Alert players when someone gets it right
        socket.on("correctAnswer", data => {
            socket.broadcast.emit("targetAnswered", data);
        });
        console.log(miniGame.users +" inside socket and room " +  miniGame.roomName);
       
    });

    // [ USER LOGOUT ]
    socket.on("disconnect", () => {
        connectedClients--;
        userList = userList.filter(user => user != socket.id);
        io.emit("refreshUserList", userList);

        //server not removing the disconnected users from the userlist
        miniGame.users = miniGame.users.filter(userName => userName != userName);
        console.log("Minigame user list: "+miniGame.users);
        io.emit("refreshMiniGameUserList", miniGame.users);

        console.log(" ");
        console.log("[------LOGOUT-----]");
        console.log(socket.id+" logged out.");
        console.log(connectedClients+" clients are still connected.");
    });
    
});




