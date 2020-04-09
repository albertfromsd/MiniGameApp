import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { navigate, Router } from '@reach/router';
import { connect } from 'react-redux';

// [ COMPONENTS ]
import NavBar from "../components/NavBar";
import Scoreboard from "../components/Scoreboard";
import GameSelector from "../components/games/GameSelector";
import Chat from '../components/chat/Chat';

// [ GAMES ]
import MathHead from '../components/games/MathHead';
import WiseToMemorize from '../components/games/WiseToMemorize';
import TypeFasterMaster from '../components/games/TypeFasterMaster';
import LittleBoxes from '../components/games/LittleBoxes';
import DontComeInsideMe from '../components/games/DontComeInsideMe';
import DropAFatShot from '../components/games/DropAFatShot';

// [ STYLING ]
import styles from './Views.module.css';
import gameStyles from '../components/games/Games.module.css';

// [ ANIMATIONS ]
import Fade from 'react-reveal';

const GameRoom = ({ dispatch, userName, roomName }) => {
    const gameName = " ";

    // [ SOCKETS ] CHOOSE ONE: localhost:8000 / deployed
    console.log("GameRoom.js before socket instantiation");

    const [ socket ] = useState( () => io(':8000') );
    // const [ socket ] = useState( () => io() );

    console.log("GameRoom.js after socket instantiation");

    // ADMIN STATE BOOLEAN
    const [ adminState, setAdminState ] = useState(false);

    console.log("GameRoom.js check before enteredGameRoom");
    useEffect( () => {
        socket.emit("enteredGameRoom", 
            {
                userName,
                roomName,
                gameName,
            }
        );

        dispatch({
            type: 'SETSOCKET',
            socket: socket,
        });
        
    }, [] );
    console.log("GameRoom.js check after enteredGameRoom");
    console.log("-------------------");
    console.log("GameRoom.js check before useEffect");

    useEffect( () => {
        if( userName === null || 
            userName.length < 1 || 
            userName === undefined || 
            roomName === null || 
            roomName.length < 1 || 
            roomName === undefined ) {
            navigate('/');
        };
        
        // socket.emit("join room", {
        //     userName,
        //     roomName
        // })

        socket.emit("scoreboardUpdate", 
            { 
                userName,
                roomName,
                gameName,
            }
        );

        socket.emit("chatLogUpdate",
            {
                userName,
                roomName,
                gameName,
            }
        )

        socket.on("syncNewUser", currentGame => {
            navigate("/"+roomName+"/"+currentGame);
        });
        
        socket.on("partyNavigator", data => {
            navigate('/'+data.roomName+'/'+data.gameName);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, userName, roomName]);

    console.log("GameRoom.js check after useEffect");

    return (
        <>
        <Fade top big>
        <NavBar socket={socket} 
            roomName={roomName} />
        <Scoreboard socket={socket}
            roomName={roomName}
            userName={userName} />
        <div className={styles.contentRow}>
            <div className={gameStyles.gameComponent}>
                <Router>
                    <GameSelector path="/" 
                        socket={socket} 
                        roomName={roomName} />
                    <MathHead path="/mathhead" 
                        socket={socket} 
                        roomName={roomName} />
                    <TypeFasterMaster path="/typefastermaster" 
                        socket={socket} 
                        roomName={roomName} />
                    <WiseToMemorize path="/wisetomemorize" 
                        socket={socket} 
                        roomName={roomName} />
                    <LittleBoxes path="/littleboxes" 
                        socket={socket} 
                        roomName={roomName} />
                    <DontComeInsideMe path="/dontcomeinsideme" 
                        socket={socket} 
                        roomName={roomName} />
                    <DropAFatShot path="/dropafatshot" 
                        socket={socket} 
                        roomName={roomName} />
                </Router>
            </div>
            <>
            <Chat socket={socket} 
                roomName = {roomName} />
            </>
        </div>
        </Fade>
        </>
    );
};

function mapStateToProps(state) {
    return {
        userName: state.userName,
    };
};

export default connect(mapStateToProps)(GameRoom);

