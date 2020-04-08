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
// const { Chat } = require('./models/Chat');
// const { User } = require('./models/User');
// const { GameRoom } = require('./models/GameRoom');

// [ ROUTES ] will be used when DB is activated
require('./routes/User.routes')(app);
require('./routes/Gameroom.routes')(app);
require('./routes/Chat.routes')(app);


// [ SOCKET / SERVER ]
const server = app.listen(8000, () => {
    console.log("Mini Game Party server is listening at Port 8000");
});
const socketIo = require('socket.io');
const io = socketIo(server);

let connectedClients = 0;
let rooms = {};

io.on("connection", socket => {

    // [ USER LOGIN ]
    connectedClients++;
    console.log(" ");
    console.log("[------LOGIN-----]");
    console.log(connectedClients+" total clients are connected to the entire site");

    //[WELCOME]
    // socket.emit('welcome', "Socket successfully connected. Happy!!");
    // socket.emit('connect');
    // socket.on('room created', data => {
    //     room = data.roomName;
    //     socket.join(room);
    //     console.log("joined room" +room);
    // })

    // [ ENTER GAMEROOM ]
    socket.on("enteredGameRoom", data => {
        console.log(data.userName+" entered the game room");

        // [ TOP ] [SET UP ROOM / PARTY ]
        if ( !rooms[data.roomName] ) {
            rooms[data.roomName] = {
                "partyName": data.roomName,
                "admin": {
                    "name": data.userName,
                    "currentGame": data.gameName,
                },
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
            console.log("Player tried to join the full party room: "+rooms[data.roomName]["partyName"]);
            socket.emit("fullParty", "That party is full");
            return;
            //not sure what to put here to stop function
        };

        // add user to scoreboard if room not full
        if ( !rooms[data.roomName]["scoreboard"][data.userName] && data.userName != null ) {
            rooms[data.roomName]["scoreboard"][data.userName] = 0;
            rooms[data.roomName]["partySize"]++;
            // if party started without new user
            if ( data.gameName != rooms[data.roomName]["admin"]["currentGame"] ) {
                socket.emit("syncNewUser", rooms[data.roomName]["admin"]["currentGame"]);
            };
        };

        if ( data.gameName != rooms[data.roomName]["admin"]["currentGame"] ) {
            socket.emit("syncNewUser", rooms[data.roomName]["admin"]["currentGame"]);
        };

        // // if null user is added to list
        // if ( rooms[data.roomName]["scoreboard"][null] ) {
        //     delete rooms[data.roomName]["scoreboard"][null];
        //     rooms[data.roomName]["partySize"]--;
        //     io.emit("refreshScoreboard", {
        //         userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
        //         scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
        //         scoreboardList: Object.entries( rooms[data.roomName] ),
        //     });
        // };

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
            console.log("Current game: "+rooms[data.roomName]["admin"]["currentGame"]);
            io.emit("partyNavigator", data);
        }); // [end] party sync


        console.log("");
        console.log("Room name: " + rooms[data.roomName]["partyName"]);
        console.log("Current Game: " +rooms[data.roomName]["admin"]["currentGame"]);
        console.log(rooms[data.roomName]["partySize"] +" players inside room: " +  rooms[data.roomName]["partyName"]);


        // [ MATH HEAD ]
        socket.on("mathHeadEntered", mathHeadEntryData => {
            console.log(mathHeadEntryData.userName+" entered Math Head");

            // set current game only when admin enters
            // [unfinished] non-admin gets redirected, but admin goes to game
            // if ( mathHeadEntryData.userName == rooms[data.roomName]["admin"] ) {
            //     rooms[data.roomName]["admin"]["currentGame"] = "mathhead";
            // } else {
            //     socket.emit("syncNewUser", rooms[data.roomName]["admin"]["currentGame"]);
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

        // [ USER EXITS ROOM ]
        socket.on("disconnect", () => {
            delete rooms[data.roomName]["scoreboard"][data.userName];
            rooms[data.roomName]["partySize"]--;

            connectedClients--;
            console.log("");
            console.log("User logged OUT: "+connectedClients+" remaining");

            console.log("Party size: "+rooms[data.roomName]["partySize"]);
            console.log("Players still here: "+ Object.keys(rooms[data.roomName]["scoreboard"]));

            if ( rooms[data.roomName]["partySize"] == 0 ) {
                delete rooms[data.roomName];
            } else {
                io.emit("refreshScoreboard", {
                    userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                    scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                    scoreboardList: Object.entries( rooms[data.roomName]["scoreboard"] ),
                });
            };
        });// [END] user exits room

    }); // [END] socket.on("enteredGameRoom") 

}); // [END] io.on("connection")