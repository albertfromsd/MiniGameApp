// [ EXPRESS ]
const express = require('express');
const app = express();
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// [ CORS ] only for localhost
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
const { Chat } = require('./models/Chat.model');
const { User } = require('./models/User.model');
const { GameRoom } = require('./models/GameRoom.model');

// [ ROUTES ] will be used when DB is activated
require('./routes/User.routes')(app);
require('./routes/Gameroom.routes')(app);
require('./routes/Chat.routes')(app);

// [ SOCKET / SERVER ]
const server = app.listen(8000);
const socketIo = require('socket.io');
const io = socketIo(server);

let rooms = {
    "name": "",
    "admin": {
        "name": "",
        "currentGame": "",
    },
    "partySize": 0,
    "scoreboard": {},
    "chatLog": [],
};

io.on("connection", socket => {
    let roomName = "";
    let admin = "";
    let userName = "";

    //[WELCOME]
    // socket.emit('welcome', "Socket successfully connected. Happy!!");
    // socket.emit('connect');
    // socket.on('room created', data => {
    //     room = data.roomName;
    //     socket.join(room);
    //     console.log("joined room" +room);
    // })
    // socket.on("disconnect", () ) {

    // }

    // [ ENTER GAMEROOM ]
    socket.on("enteredGameRoom", data => {
        console.log(data.userName+" entered the game room");

        // [ TOP ] [SET UP ROOM / PARTY ]
        if ( !rooms[data.roomName] ) {
            rooms[data.roomName] = {
                "name": data.roomName,
                "admin": {
                    "name": data.userName,
                    "currentGame": data.gameName,
                },
                "partySize": 0,
                "scoreboard": {},
                "chatLog": [],
            };

            admin = rooms[data.roomName]["admin"]["name"];

            console.log("");
            console.log( "[NEW ROOM]: "+rooms[data.roomName]["name"] );
            console.log( "[ADMIN]: " + rooms[data.roomName]["admin"]["name"] );
        };

        // 6 max per room / party
        if ( rooms[data.roomName]["partySize"] > 5 ) {
            console.log("Sorry "+data.userName+" "+rooms[data.roomName]["name"]+" is full");
            socket.emit("fullParty", "That party room is full");
            return;
            //not sure what to put here to stop function
        };

        // add user to scoreboard if room not full
        if( !rooms[data.roomName]["scoreboard"][data.userName] 
            && data.userName != null ) {

            rooms[data.roomName]["scoreboard"][data.userName] = 0;
            rooms[data.roomName]["partySize"]++;

            console.log("["+rooms[data.roomName]["name"]+"] Party size: "+ rooms[data.roomName]["partySize"]);
        };

        // new user sync with existing party
        if ( data.gameName != rooms[data.roomName]["admin"]["currentGame"] ) {
            socket.emit("syncNewUser", rooms[data.roomName]["admin"]["currentGame"]);
        };

        roomName = data.roomName;
        userName = data.userName;

        // [ SCOREBOARD ]
        socket.on("scoreboardUpdate", data => {
            io.emit("refreshScoreboard", {
                userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                scoreboardList: Object.entries( rooms[data.roomName] ),
            });
        }); // [end] scoreboard

        // [ END ] [SET UP ROOM ]

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
        
        socket.on("chatLogUpdate", data => {
            io.emit("updateChatLog", rooms[data.roomName]["chatLog"])
        }); // [end] chat

        // PARTY SYNC
        socket.on("navigateParty", data => {
            rooms[data.roomName]["admin"]["currentGame"] = data.gameName;
            console.log("Entering new game: "+rooms[data.roomName]["admin"]["currentGame"]);
            io.emit("partyNavigator", data);
        }); // [end] party sync


        console.log("");
        console.log("Room name: " + rooms[data.roomName]["name"]);
        console.log("Current Game: " +rooms[data.roomName]["admin"]["currentGame"]);
        console.log(rooms[data.roomName]["partySize"] +" players inside room: " +  rooms[data.roomName]["name"]);


        // [ MATH HEAD ]
        socket.on("mathHeadEntered", mathHeadEntryData => {
            console.log(mathHeadEntryData.userName+" entered Math Head");

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
        }); // [end] mathhead


        // [ TYPE FASTER MASTER ]
        socket.on("typeFasterEntered", typeFasterEntryData=> {
            console.log(typeFasterEntryData.userName+" entered TypeFasterMaster");

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
        }); // [end] typefastermaster

    }); // [END] socket.on("enteredGameRoom") 

    // [ USER EXITS ROOM ]
    // declare variables you need before nested sockets i.e. data.xxx
    socket.on("disconnect", () => {
        delete rooms[roomName]["scoreboard"][userName];
        rooms[roomName]["partySize"]--;

        console.log("");
        console.log("[ LOGOUT NOTICE ]");
        console.log(rooms[roomName]["partySize"] + " remaining in " + rooms[roomName]["name"]);
        console.log("Players still here: "+ Object.keys(rooms[roomName]["scoreboard"]));

        if ( rooms[roomName]["partySize"] == 0 ) {
            delete rooms[roomName];
        } else {
            io.emit("refreshScoreboard", {
                userList: Object.keys( rooms[roomName]["scoreboard"] ),
                scoreList: Object.values( rooms[roomName]["scoreboard"] ),
                scoreboardList: Object.entries( rooms[roomName]["scoreboard"] ),
            });
        };
    });// [END] user exits room

}); // [END] io.on("connection")