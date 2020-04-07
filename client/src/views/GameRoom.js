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
import chatStyles from '../components/chat/Chat.module.css';

//[ Animations ]
import Fade from 'react-reveal';

const GameRoom = ({ dispatch, userName, roomName }) => {
    if (userName == null || userName.length < 1 ) {
        navigate('/');
    };

    //create socket for port :8000
    // const [ socket ] = useState( () => io(':8000') );
    
    //craete socket for deployed version
    const [ socket ] = useState( () => io('http://18.224.202.0:8000') );


    const [ scoreboard, setScoreboard ] = useState([]);

    dispatch({
        type: 'SETSOCKET',
        socket: socket,
    });

    useEffect( () => {

        // socket.emit("join room", {
        //     userName,
        //     roomName
        // })

        socket.emit("enteredGameRoom", 
            {
                socketId: socket.id,
                userName,
                roomName,
                "gameName": "",
            }
        );

        socket.on("syncNewUser", data => {
            navigate("/"+roomName+"/"+data);
        });

        socket.emit("scoreboardUpdate", 
            { 
                userName,
                roomName,
            }
        );
        socket.on("refreshScoreboard", data => {
            setScoreboard(data.scoreboardList);
        });
        
        socket.on("partyNavigator", data => {
            navigate('/'+data.roomName+'/'+data.gameName);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, userName, roomName]);

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
                        socket={socket} />
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
        socket: state.socket,
        userName: state.userName,
    };
};

export default connect(mapStateToProps)(GameRoom);

