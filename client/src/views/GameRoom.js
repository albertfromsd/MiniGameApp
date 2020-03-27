import React, { useState, useEffect } from 'react';
import { Link, Router, navigate } from '@reach/router';

// [ STYLES ]
import styles from "./Lobby.module.css";

import NavBar from "../components/NavBar";

// [ GAME COMPONENTS ]
import MathHead from '../components/games/MathHead';

const GameRoom = ({ socket, userName, roomName }) => {

    const gameSelector = e => {
        navigate('/'+roomName+'/'+e.target.value);
    };

    return (
        <>
        <NavBar />
        <div className={styles.flexColCen}>
            <h2>Welcome to the Lobby: {roomName}!</h2>
                <br/>
            <h3>Pick a game below:</h3>
                <br/>
            <button 
                onClick={gameSelector} 
                value="mathhead"
                className={styles.btn}>
                    Math Head
            </button>{" "}
                <br/>
            <button 
                onClick={gameSelector} 
                value="wisetomemorize"
                className={styles.btn}>
                    Wise to Memorize
            </button>{" "}
                <br/>
            <button 
                onClick={gameSelector} 
                value="typefastermaster"
                className={styles.btn}>
                    Type Faster Master
            </button>{" "}
                <br/>
            <button 
                onClick={gameSelector} 
                value="littleboxes"
                className={styles.btn}>
                    Little Boxes
            </button>{" "}
                <br/>
            <button 
                onClick={gameSelector} 
                value="dontcomeinsideme"
                className={styles.btn}>
                    Don't Come Inside Me
            </button>{" "}
                <br/>
            <button 
                onClick={gameSelector} 
                value="dropafatshot"
                className={styles.btn}>
                    Drop a Fat Shot
            </button>{" "}
                <br/>
        </div>
    </>
    )
}

export default GameRoom;