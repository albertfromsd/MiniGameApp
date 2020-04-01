import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { navigate, Router } from '@reach/router';
import { connect } from 'react-redux';

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

import styles from '../components/chat/Chat.module.css';

const GameRoom = ({ dispatch, userName, roomName }) => {

    if (userName == null || userName.length < 1 ) {
        navigate('/');
    };

    const [ socket ] = useState( () => io(':8000') );

    dispatch({
        type: 'SETSOCKET',
        socket: socket,
    });

    useEffect( () => {
        socket.on('welcome', data => {
            console.log(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <>
        <NavBar socket={socket} roomName={roomName} />
        <div className={styles.contentRow}>
            <div className={styles.gameComponent}>
                <Router>
                    <GameSelector path="/" />
                    <MathHead path="/mathhead" socket={socket} roomName={roomName} />
                    <TypeFasterMaster path="/typefastermaster" socket={socket} roomName={roomName} />
                    <WiseToMemorize path="/wisetomemorize" socket={socket} roomName={roomName} />
                    <LittleBoxes path="/littleboxes" socket={socket} roomName={roomName} />
                    <DontComeInsideMe path="/dontcomeinsideme" socket={socket} roomName={roomName} />
                    <DropAFatShot path="/dropafatshot" socket={socket} roomName={roomName} />
                </Router>
            </div>
                <br /> <br /> <br />
            <div className={styles.chatBox}>
                <Chat socket={socket} roomName={roomName} />
            </div>
        </div>

    </>
    )
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        userName: state.userName,
        userScore: state.userScore
    };
};

export default connect(mapStateToProps)(GameRoom);