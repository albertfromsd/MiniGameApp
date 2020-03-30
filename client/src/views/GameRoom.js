import React, { useState, useEffect } from 'react';
import { Link, Router, navigate } from '@reach/router';
import { connect } from 'react-redux';

// [ STYLES ]
import styles from "./Views.module.css";


// [ COMPONENTS ]
import NavBar from "../components/NavBar";


const GameRoom = ({ socket, dispatch, userName, roomName }) => {
    // insert check if user submitted a userName
    // if (!userName || !socket ) {
    //     navigate('/');
    // };
    const [gameName, setGameName] = useState("");

    dispatch({
        type: 'SETGAMENAME',
        gameName: gameName,
      });

    const gameSelector = e => {
        let game = e.target.value;
        setGameName(game);
        console.log("game name:" + gameName);
        navigate('/'+roomName+'/'+e.target.value);
    };

    return (
        <>
        <NavBar roomName={roomName}/>
        <div className={styles.flexColCen}>
            <h2 className={styles.textWhite}>Welcome, {userName}!</h2>
            <h3 className={styles.textWhite}>You are in  Room {roomName}</h3>
                <br/>
            <h3 className={styles.textWhite}>Pick a game below:</h3>
                <br/>
            <div className={styles.flexRowCen}>
                <div className={styles.flexColCen}>
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
                </div>
                <div className={styles.flexColCen}>
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