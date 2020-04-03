import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { navigate, Router } from '@reach/router';
import { connect, useSelector } from 'react-redux';

// [ COMPONENTS ]
import NavBar from "../components/NavBar";
import GameSelector from "../components/games/GameSelector";
import Chat from '../components/chat/Chat';

// [ GAMES ]
import MathHead from '../components/games/MathHead';
import WiseToMemorize from '../components/games/WiseToMemorize';
import TypeFasterMaster from '../components/games/TypeFasterMaster';
import LittleBoxes from '../components/games/LittleBoxes';
import DontComeInsideMe from '../components/games/DontComeInsideMe';
import DropAFatShot from '../components/games/DropAFatShot';

// [ CSS MODULES ]
import styles from './Views.module.css';
import gameStyles from '../components/games/Games.module.css';
import chatStyles from '../components/chat/Chat.module.css';

//[ Animations ]
import Fade from 'react-reveal';

const GameRoom = ({ dispatch, userName, roomName }) => {

    // const gameName = useSelector( (state) => state.gameName);

    if (userName == null || userName.length < 1 ) {
        navigate('/');
    };

    const [ socket ] = useState( () => io(':8000') );

    useEffect( () => {
        socket.emit("enteredGameRoom", 
            {
                userName,
                roomName,
            }
        );
    }, [socket, userName, roomName]);


    dispatch({
        type: 'SETSOCKET',
        socket: socket,
    });

    useEffect( () => {
         socket.emit("enteredGameRoom", 
            {
                socketId: socket.id,
                userName,
                roomName,
            }
           );
        
        socket.on("partyNavigator", data => {
            navigate('/'+data.roomName+'/'+data.gameName);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <>
       <Fade top big>
       <NavBar socket={socket} 
            roomName={roomName} />
            <button className={styles.prettyBtn}>Leave Room</button>
        <div className={styles.contentRow}>
            <div className={gameStyles.gameComponent}>
                <Router>
                    <GameSelector path="/" />
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
            <div className={chatStyles.chatBox}>
                <Chat socket={socket} roomName={roomName} />
            </div>
        </div>
       </Fade>
        </>
    );
};

function mapStateToProps(state) {
    return {
        socket: state.socket,
        gameName: state.gameName,
        userName: state.userName,
        userScore: state.userScore
    }
};

export default connect(mapStateToProps)(GameRoom);
