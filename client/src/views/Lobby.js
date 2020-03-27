import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {  Router, navigate } from '@reach/router';

import styles from './Lobby.module.css';

import NavBar from '../components/NavBar';

import HumanCalculator from '../components/games/HumanCalculator';
import WiseToMemorize from '../components/games/WiseToMemorize';
import TypeFasterMaster from '../components/games/TypeFasterMaster';
import LittleBoxes from '../components/games/LittleBoxes';

import DontComeInsideMe from '../components/games/DontComeInsideMe';

import DropAFatShot from '../components/games/DropAFatShot';



const Lobby = () => {
    const [ socket ] = useState( () => io(':8000') );
    const [ user, setUser ] = useState("")

    useEffect( () => {
        // axios.get("/api/user/id/"+userid)
        //     .then(res => setUser(res.data))
        //     .catch(console.log);

        socket.on('welcome', data => {
            console.log(data);
        });
        return () => {
            socket.disconnect();
        }
    }, [socket]);

    const gameSelector = e => {
        navigate('/games/'+e.target.value);
    };

    return (
        <>
        <NavBar />
            <br/>
        <div className={styles.entirePage}>
            <h2>Game Room Lobby</h2>
                <br/>
            <h3>Pick a game below:</h3>
                <br/>
            <button onClick={gameSelector} value="humancalculator">Human Calculator</button>{" "}
                <br/>
            <button onClick={gameSelector} value="wisetomemorize">Wise to Memorize</button>{" "}
                <br/>
            <button onClick={gameSelector} value="typefastermaster">Type Faster Master</button>{" "}
                <br/>
            <button onClick={gameSelector} value="littleboxes">Little Boxes</button>{" "}
                <br/>
            <button onClick={gameSelector} value="dontcomeinsideme">Don't Come Inside Me</button>{" "}
                <br/>
            <button onClick={gameSelector} value="dropafatshot">Drop a Fat Shot</button>{" "}
                <br/>
        </div>
        <Router basepath="/games">
            <HumanCalculator path="/humancalculator" socket={socket} />
            <WiseToMemorize path="/wisetomemorize" socket={socket} />
            <TypeFasterMaster path="/typefastermaster" socket={socket} />
            <LittleBoxes path="/littleboxes" socket={socket} />
            <DontComeInsideMe path="/dontcomeinsideme" socket={socket} />
            <DropAFatShot path="/dropafatshot" socket={socket} />
        </Router>

        </>
    );
};

export default Lobby;