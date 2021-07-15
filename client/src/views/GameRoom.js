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
import chatStyles from '../components/chat/Chat.module.css'

// [ ANIMATIONS ]
import Fade from 'react-reveal';

const GameRoom = ({ dispatch, userName, roomName }) => {
    const gameName = " ";

    // [ SOCKETS ] CHOOSE ONE: localhost:8000 / deployed
    // const [ socket ] = useState( () => io(':8000') );
    const [ socket ] = useState( () => io() );

    // ADMIN STATE BOOLEAN
    const [ adminState, setAdminState ] = useState(false);

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
            socket,
        });

        dispatch({
            type: 'SETUSERNAME',
            userName,
        });

        dispatch({
            type: 'SETROOMNAME',
            roomName,
        });

        dispatch({
            type: 'SETGAMENAME',
            gameName,
        });

        // will this work?
        // dispatch(
        //     {
        //         type: 'SETSOCKET',
        //         socket,
        //     },
        //     {
        //         type: 'SETUSERNAME',
        //         userName,
        //     },
        //     {
        //         type: 'SETROOMNAME',
        //         roomName,
        //     },
        //     {
        //         type: 'SETGAMENAME',
        //         gameName,
        //     },
        // );

    }, [] );

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

        socket.on("setAdmin", admin => {
            console.log(admin);
            dispatch({
                type: 'SETADMIN',
                admin
            });
        });

        socket.emit("chatLogUpdate",
            {
                userName,
                roomName,
            }
        );

        socket.emit("scoreboardUpdate", 
            { 
                userName,
                roomName,
            }
        );

        socket.on("syncNewUser", data => {
            dispatch({
                type: 'SETADMIN',
                admin: data.name
            })
            navigate("/"+roomName+"/"+data.currentGame);
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
            roomName={roomName} />
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
            <div className={chatStyles.chatComponent}>
                <Chat socket={socket} 
                    roomName = {roomName} />
            </div>
        </div>
        </Fade>
        </>
    );
};

function mapStateToProps(state) {
    return {
        userName: state.userName,
        admin: state.admin,
    };
};

export default connect(mapStateToProps)(GameRoom);

