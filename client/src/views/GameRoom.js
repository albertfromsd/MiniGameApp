import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { navigate, Router } from '@reach/router';
import { connect } from 'react-redux';

// [ STYLES ]
import styles from "./Views.module.css";

// [ COMPONENTS ]
import NavBar from "../components/NavBar";
import GameSelector from "../components/games/GameSelector";

// [ GAMES ]
import MathHead from '../components/games/MathHead';
import WiseToMemorize from '../components/games/WiseToMemorize';
import TypeFasterMaster from '../components/games/TypeFasterMaster';
import LittleBoxes from '../components/games/LittleBoxes';

import DontComeInsideMe from '../components/games/DontComeInsideMe';
import DropAFatShot from '../components/games/DropAFatShot';

const GameRoom = ({ dispatch, userName, roomName }) => {

    if (userName == null || userName.length < 1 ) {
        navigate('/')
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
        }
    }, [socket]);

    return (
        <>
        <NavBar roomName={roomName} />
        <Router>
            <GameSelector path="/" />
            <MathHead path="/mathhead" socket={socket}/>
            <TypeFasterMaster path="/typefastermaster" socket={socket}/>
            <WiseToMemorize path="/wisetomemorize" socket={socket}/>
            <LittleBoxes path="/:roomName/littleboxes" socket={socket}/>
            <DontComeInsideMe path="/:roomName/dontcomeinsideme" socket={socket}/>
            <DropAFatShot path="/:roomName/dropafatshot" socket={socket} />
        </Router>
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