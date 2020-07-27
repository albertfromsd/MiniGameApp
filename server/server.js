// [ EXPRESS ]
const express = require('express');
const app = express();
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// [ CORS ] only for offline-development
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
        // [SET UP ROOM / PARTY ]
        // [ROOM CREATION]
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

            io.emit("setAdmin", data.userName);
            console.log("server setAdmin event emitted: "+data.userName);
            console.log("newRoom admin check: "+rooms[data.roomName]["admin"]["name"]);

        }; // [end] room creation

        admin = rooms[data.roomName]["admin"]["name"];
        console.log("");
        console.log( "[NEW ROOM]: "+rooms[data.roomName]["name"] );
        console.log( "[ADMIN]: " + rooms[data.roomName]["admin"]["name"] );


        // 6 max per room / party
        // move room size validation in the backend
        if ( rooms[data.roomName]["partySize"] > 5 ) {
            console.log("Sorry, "+data.userName+". "+rooms[data.roomName]["name"]+" is full");
            socket.emit("fullParty", "That party room is full");
            return; //not sure what to put here to stop function
        };


        // [ADD USER] to scoreboard if room not full
        if( !rooms[data.roomName]["scoreboard"][data.userName] 
            && data.userName != null
            && rooms[data.roomName]["partySize"] < 6 ) {

            rooms[data.roomName]["scoreboard"][data.userName] = 0;
            rooms[data.roomName]["partySize"]++;

            io.emit("setAdmin", rooms[data.roomName]["admin"]["name"]);

            console.log("["+rooms[data.roomName]["name"]+"] Party size: "+ rooms[data.roomName]["partySize"]);
        };

        // ASSIGN VALUES to variables declared at a higher level, to use in disconnect
        roomName = data.roomName;
        userName = data.userName;


        // [SYNC NEW USER] with existing party
        if ( data.gameName != rooms[data.roomName]["admin"]["currentGame"] ) {
            socket.emit("syncNewUser", rooms[data.roomName]["admin"]);
        };


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

        // [NAVIGATE PARTY] in sync
        socket.on("navigateParty", data => {
            rooms[data.roomName]["admin"]["currentGame"] = data.gameName;
            console.log("Entering new game: "+rooms[data.roomName]["admin"]["currentGame"]);
            io.emit("partyNavigator", data);
        }); // [end] navigate party in sync

        // [C.LOG CHECK]
        console.log("");
        console.log("Room name: " + rooms[data.roomName]["name"]);
        console.log("Current Game: " +rooms[data.roomName]["admin"]["currentGame"]);
        console.log(rooms[data.roomName]["partySize"] +" players inside room: " +  rooms[data.roomName]["name"]);
        // [end] c.log check


        // [ MATH HEAD ]
        socket.on("mathHeadEntered", mathHeadEntryData => {
            // SHARE TARGET after generation
            socket.on("mathHeadTargetGenerated", mathHeadData => {
                io.emit("sharedMathHeadTarget", mathHeadData);
                io.emit("startTimer", mathHeadData);
                console.log("server startTimer activated: "+mathHeadData.timeAllowed);
            });

            // TARGET ANSWERED correctly
            socket.on("mathHeadTargetAnswered", mathHeadData => {
                rooms[data.roomName]["scoreboard"][mathHeadData.userName] += mathHeadData.points;

                socket.broadcast.emit("answeredMathHeadTarget", mathHeadData);
                io.emit("refreshScoreboard", {
                    userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                    scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                    scoreboardList: Object.entries( rooms[data.roomName]["scoreboard"] ),
                });
            }); // [end] target answered correctly
        }); // [end] mathhead


        // [ TYPE FASTER MASTER ]
        socket.on("typeFasterEntered", typeFasterEntryData=> {
            // SHARE TARGET after generation
            socket.on("typeFasterTargetGenerated", typeFasterTarget => {
                io.emit("sharedTypeFasterTarget", typeFasterTarget);
            });

            // TARGET ANSWERED correctly
            socket.on("typeFasterTargetAnswered", typeFasterAnswerData => {
                rooms[data.roomName]["scoreboard"][typeFasterAnswerData.userName] += typeFasterAnswerData.points;

                socket.broadcast.emit("answeredTypeFasterTarget", typeFasterAnswerData);
                io.emit("refreshScoreboard", {
                    userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                    scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                    scoreboardList: Object.entries( rooms[data.roomName]["scoreboard"] ),
                });
            }); // [end] typefaster target answered correctly
        }); // [end] typefastermaster


        // [ WISE TO MEMORIZE ]
        socket.on("wiseToMemorizeEntered", wiseToMemorizeEntryData => {
            // SHARE TARGET after generation
            socket.on("wiseToMemorizeTargetGenerated", wiseToMemorizeTarget => {
                io.emit("sharedWiseToMemorizeTarget", wiseToMemorizeTarget);
            });

            // TARGET ANSWERED correctly
            socket.on("wiseToMemorizeTargetAnswered", wiseToMemorizeResults => {
                rooms[data.roomName]["scoreboard"][wiseToMemorizeResults.userName] += wiseToMemorizeResults.points;

                socket.broadcast.emit("resultsWiseToMemorize", wiseToMemorizeResults);
                io.emit("refreshScoreboard", {
                    userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                    scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                    scoreboardList: Object.entries( rooms[data.roomName]["scoreboard"] ),
                });
            }); // [end] wise to memorize target answered correctly
        }); // [end] wise to memorize


        // [ LITTLE BOXES ]
        socket.on("littleBoxesEntered", littleBoxesEntryData => {
            // SHARE TARGET after generation
            socket.on("littleBoxesTargetGenerated", littleBoxesTarget => {
                io.emit("sharedLittleBoxesTarget", littleBoxesTarget);
            });

            // TARGET ANSWERED correctly
            socket.on("littleBoxesTargetResults", littleBoxesResults => {
                rooms[data.roomName]["scoreboard"][littleBoxesResults.userName] += littleBoxesResults.points;

                socket.broadcast.emit("resultsLittleBoxes", littleBoxesResults);
                io.emit("refreshScoreboard", {
                    userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                    scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                    scoreboardList: Object.entries( rooms[data.roomName]["scoreboard"] ),
                });
            }); // [end] dont come inside me target answered correctly
        }); // [end] dont come inside me


        // [ DON'T COME INSIDE ME ]
        socket.on("dontComeEntered", dontComeEntryData => {
            // SHARE TARGET after generation
            socket.on("dontComeTargetGenerated", dontComeTarget => {
                io.emit("sharedDontComeTarget", dontComeTarget);
            });

            // TARGET ANSWERED correctly
            socket.on("dontComeTargetResults", dontComeResults => {
                rooms[data.roomName]["scoreboard"][dontComeResults.userName] += dontComeResults.points;

                socket.broadcast.emit("resultsDontComeTarget", dontComeResults);
                io.emit("refreshScoreboard", {
                    userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                    scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                    scoreboardList: Object.entries( rooms[data.roomName]["scoreboard"] ),
                });
            }); // [end] dont come inside me target answered correctly
        }); // [end] dont come inside me


        // [ DROP A FAT SHOT ]
        socket.on("dropAFatShotEntered", dropAFatShotEntryData => {
            // SHARE TARGET after generation
            socket.on("dropAFatShotTargetGenerated", dontComeTarget => {
                io.emit("sharedDontComeTarget", dontComeTarget);
            });

            // TARGET ANSWERED correctly
            socket.on("dropAFatShortResults", dropAFatShotResults => {
                rooms[data.roomName]["scoreboard"][dropAFatShotResults.userName] += dropAFatShotResults.points;

                socket.broadcast.emit("resultsDontComeTarget", dropAFatShotResults);
                io.emit("refreshScoreboard", {
                    userList: Object.keys( rooms[data.roomName]["scoreboard"] ),
                    scoreList: Object.values( rooms[data.roomName]["scoreboard"] ),
                    scoreboardList: Object.entries( rooms[data.roomName]["scoreboard"] ),
                });
            }); // [end] dont come inside me target answered correctly
        }); // [end] drop a fat shot

    }); // [END] socket.on("enteredGameRoom") 

    // [ USER LOGOUT ]
    socket.on("disconnect", () => {
        // need if statement bc after saving some components, the page does not refresh even though the rooms[roomName] gets erased
        if ( rooms[roomName] ) {
            delete rooms[roomName]["scoreboard"][userName];
            rooms[roomName]["partySize"]--;

            console.log("---------------------");
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
            }; // [end] delete empty room
        }; // [end] check if rooms[roomName] exists

    });// [END] user logout

}); // [END] io.on("connection")