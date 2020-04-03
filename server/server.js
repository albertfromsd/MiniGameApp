// [ EXPRESS ]
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// [ MODELS ] add when DB is activated
// const { Chat } = require('./models/Chat');
// const { User } = require('./models/User');
// const { GameRoom } = require('./models/GameRoom');

// [ ROUTES ] will be used when DB is activated
require('./routes/User.routes')(app);
require('./routes/GameRoom.routes')(app);
require('./routes/Chat.routes')(app);


// [ SOCKET / SERVER ]
const server = app.listen(8000, () => {
    console.log("Mini Game Part server is listening at Port 8000");
});
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

let rooms = {};

// rooms = {
//     "roomName": {
//          "partyName": "roomName",
//          "admin": userWhoEnteredFirst
//          "currentGame": "MathHead",
//          "partySize": 0,
//          "scoreboard": {
//              "Prativa": 0,
//              "Albert": 0
//          },
//          "chatLog": [{
//              "timestamp": data.timestamp,   
//              "userName": data.userName,
//              "message": data.message,
//          }]
//     };
// }; // end of example rooms

io.on("connection", socket => {

    // [ USER LOGIN ]
    connectedClients++;
    console.log(" ");
    console.log("[------LOGIN-----]");
    console.log("User: "+socket.id+" has entered the app!");
    console.log(connectedClients+" of clients are connected");

    //[WELCOME]
    // socket.emit('welcome', "Socket successfully connected. Happy!!");
    // socket.emit('connect');
    // socket.on('room created', data => {
    //     room = data.roomName;
    //     socket.join(room);
    //     console.log("joined room" +room);
    // })

    // [ AUTO REFRESH LOGS/LIST]
    // socket.on("enteredGameRoom", data => {
    //     io.emit('refreshChatLog', chatLog);
    //     io.emit("refreshUserList", userList);
    // });

    // io.emit('refreshChatLog', chatLog);
    // io.emit("refreshUserList", userList);

    // // [ NEW MESSAGE ]
    // socket.on("new message", newMsg => {
    //     chatLog.push(newMsg);
    //     io.emit("refreshChatLog", chatLog);
    // });

    // [ GLOBAL EVENT LISTENERS ]    
    socket.on("navigateParty", data => {
        io.emit("partyNavigator", data);
    });

    // [ ENTER GAMEROOM ]
    socket.on("enteredGameRoom", data => {

        // [ TOP ] [SET UP ROOM / PARTY ]
        if ( !rooms[data.roomName] ) {
            rooms[data.roomName] = {
                "partyName": data.roomName,
                "currentGame": "",
                "partySize": 0,
                "scoreboard": {},
                "chatLog": [],
            };
            console.log("");
            console.log(rooms[data.roomName]["partyName"] + " created");
        }

        // 6 max per room / party
        if ( rooms[data.roomName]["partySize"] > 5 ) {
            console.log("");
            console.log("Player tried to join the full room: "+rooms[data.roomName]["roomName"]);
            socket.emit("fullParty", "That party is full");
            //not sure what to put here to stop function
        };

        // add user to scoreboard if room not full
        if ( !rooms[data.roomName]["scoreboard"][data.userName] ) {
            rooms[data.roomName]["scoreboard"][data.userName] = 0;
            rooms[data.roomName]["partySize"]++;
            // if party started without new user
            if ( data.gameName != rooms[data.roomName]["currentGame"] ) {
                socket.emit("syncNewUser", rooms[data.roomName]["currentGame"]);
            }
        };

        // [ SCOREBOARD ]
        socket.on("scoreboardUpdate", data => {
            io.emit("refreshScoreboard", {
                userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                scoreboardList: Object.entries( rooms[data.roomName] ),
            });
        });

        // [ CHAT ]
        socket.on("newMsg", msgData => {
            let message = {
                timestamp: msgData.timestamp,
                userName: msgData.userName,
                msg: msgData.userInput,
            }
            rooms[data.roomName]["chatLog"].push(message);
            io.emit("updateChatLog", rooms[data.roomName]["chatLog"]);
        });

        console.log("");
        console.log("Room name: " + rooms[data.roomName]["partyName"]);
        console.log("Current Game: " +rooms[data.roomName]["currentGame"]);
        console.log(rooms[data.roomName]["partySize"] +" players inside socket and room name: " +  rooms[data.roomName]["partyName"]);
        // [ END ] [SET UP ROOM ]

        // [ MATH HEAD ]
        socket.on("mathHeadEntered", mathHeadEntryData => {

            // set current game only when admin enters
            // [unfinished] non-admin gets redirected, but admin goes to game
            // if ( mathHeadEntryData.userName == rooms[data.roomName]["admin"] ) {
            //     rooms[data.roomName]["currentGame"] = "mathhead";
            // } else {
            //     socket.emit("syncNewUser", rooms[data.roomName]["currentGame"]);
            // };
            // [unfinished]

            // [ MATH HEAD EVENT LISTENERS ]
            //Share question after generated
            socket.on("mathHeadTargetGenerated", mathHeadData => {
                io.emit("sharedMathHeadTarget", mathHeadData);
            });
            
            //Alert players when someone gets it right
            socket.on("mathHeadTargetAnswered", mathHeadData => {
                rooms[data.roomName]["scoreboard"][mathHeadData.userName] += mathHeadData.points;

                socket.broadcast.emit("answeredMathHeadTarget", mathHeadData);

                io.emit("refreshScoreboard", {
                    userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                    scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                    scoreboardList: Object.entries( rooms[data.roomName]["scoreboard"] ),
                });
            });
        });

  // NORMAL
//      // [ TYPE FASTER MASTER ]
        socket.emit('message', 'what is going on, party people?');
        socket.on("enteredTypeFaster", typeFasterEntryData=> {

            //Share question after generated
            socket.on("typeFasterTargetGenerated", typeFasterTarget => {
                io.emit("sharedTypeFasterTarget", typeFasterTarget);
            });

            //Alert players when someone gets it right
            socket.on("typeFasterTargetAnswered", typeFasterAnswerData => {
                rooms[data.roomName]["scoreboard"][typeFasterAnswerData.userName] += typeFasterAnswerData.points;
                
                socket.broadcast.emit("answeredTypeFasterTarget", typeFasterAnswerData);

                io.emit("refreshScoreboard", {
                    userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                    scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                    scoreboardList: Object.entries( rooms[data.roomName]["scoreboard"] ),
                });
            });

    });

            // [ USER LOGOUT ]
        socket.on("disconnect", () => {
            rooms[data.roomName]["partySize"]--;
            connectedClients--;
            delete rooms[data.roomName]["scoreboard"][data.userName];

            console.log("Party size: "+rooms[data.roomName]["partySize"]);
            console.log("Players still here: "+ Object.keys(rooms[data.roomName]["scoreboard"]));

            if ( rooms[data.roomName]["partySize"] == 0 ) {
                delete rooms[data.roomName];
            };

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
        });// [END] socket.on("disconnect")
    }); // [END] socket.on("enteredGameRoom") 
}); // [END] io.on("connection")