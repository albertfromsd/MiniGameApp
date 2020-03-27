// [MAIN COMPONENTS]
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Router, navigate } from '@reach/router';
import { connect } from 'react-redux';

// [STYLES]
import styles from './Lobby.module.css';

// [NAVBAR]
import NavBar from '../components/NavBar';

// [GAMES]
import MathHead from '../components/games/MathHead';
import WiseToMemorize from '../components/games/WiseToMemorize';
import TypeFasterMaster from '../components/games/TypeFasterMaster';
import LittleBoxes from '../components/games/LittleBoxes';

import DontComeInsideMe from '../components/games/DontComeInsideMe';
import DropAFatShot from '../components/games/DropAFatShot';

const Lobby = ({ dispatch, user }) => {
    const [ socket ] = useState( () => io(':8000') );
    const [ userName, setUserName ] = useState("");
    const [ roomName, setRoomName ] = useState("");

    useEffect( () => {
        socket.on('welcome', data => {
            console.log(data);
        });
        return () => {
            socket.disconnect();
        }
    }, [socket]);

    const enterRoom = e => {
        e.preventDefault();

        navigate('/'+roomName);

    }
    // in Line 24 we will need a form to let user input their displayed name + room they want to enter/create
    // in /views/GameRoom.js we will have a list of sockets connected, chatbox, + list of games (later we will add total score for session using state or redux)

    return (
        <>
        <NavBar />
        <div className={styles.flexColCen}>
            <h2>Welcome to the Mini Game App Lobby!</h2><br/>
            <p>Please enter your username and room you want to enter or create</p> <br/>
            <form className={styles.flexColCen} onSubmit={enterRoom}>
                <label>Username: </label>
                <input
                    type="text"
                    value={userName}
                    onChange={e => setUserName(e.target.value)} /> <br/>
                <label>Room Name:</label>
                <input 
                    type="text"
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)} /> <br/>
                <input type="submit" value="Enter room" />
            </form>
        </div>
        <Router basepath="/:roomName">
            <MathHead path="/mathhead" userName={userName} socket={socket} />
            <WiseToMemorize path="/wisetomemorize" userName={userName} socket={socket} />
            <TypeFasterMaster path="/typefastermaster" userName={userName} socket={socket} />
            <LittleBoxes path="/littleboxes" userName={userName} socket={socket} />
            <DontComeInsideMe path="/dontcomeinsideme" userName={userName} socket={socket} />
            <DropAFatShot path="/dropafatshot" userName={userName} socket={socket} />
        </Router>
        </>
    );
};

export default Lobby;