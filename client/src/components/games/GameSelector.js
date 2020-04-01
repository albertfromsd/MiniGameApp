import React, {useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

import styles from './Games.module.css';

const GameSelector = ({ socket, dispatch, userName, roomName }) => {

    const [gameName, setGameName] = useState("");

    const gameSelector = e => {
        let game = e.target.value;
        setGameName(game);

        dispatch({
            type: 'SETGAMENAME',
            gameName: gameName,
        });

        dispatch({
            type: 'SETROOMNAME',
            gameName: roomName,
        });

        navigate('/'+roomName+'/'+e.target.value);
    };

    return (
        <>
        <div className={[styles.flexColCen, styles.textWhite, styles.onlyDiv].join(' ')}>
            <div className={styles.flexColCen}>
                <h2 className={styles.textWhite}>Welcome, {userName}!</h2>
                <h3 className={styles.textWhite}>You are in Room: {roomName}</h3>
                    <br/>
                <h3 className={styles.textWhite}>Pick a game below:</h3>
                    <br/>
                <div className={styles.flexRowCen}>
                    <div className={styles.flexColCen}>
                        <button 
                            onClick={gameSelector} 
                            value="mathhead"
                            className={styles.gameBtn}>
                                Math Head
                        </button>{" "}
                        <br/>
                            <button 
                            onClick={gameSelector} 
                            value="wisetomemorize"
                            className={styles.gameBtn}>
                                Wise to Memorize
                        </button>{" "}
                            <br/>
                        <button 
                        onClick={gameSelector} 
                        value="dontcomeinsideme"
                        className={styles.gameBtn}>
                            Don't Come Inside Me
                        </button>{" "}
                            <br/>
                    </div>
                    <div className={styles.flexColCen}>
                        <button 
                            onClick={gameSelector} 
                            value="typefastermaster"
                            className={styles.gameBtn}>
                                Type Faster Master
                        </button>{" "}
                            <br/>
                        <button 
                            onClick={gameSelector} 
                            value="littleboxes"
                            className={styles.gameBtn}>
                                Little Boxes
                        </button>{" "}
                            <br/>
                        <button 
                            onClick={gameSelector} 
                            value="dropafatshot"
                            className={styles.gameBtn}>
                                Drop a Fat Shot
                        </button>{" "}
                            <br/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

function mapStateToProps(state) {
    return {
        socket: state.socket,
        userName: state.userName,
        userScore: state.userScore
    };
};

export default connect(mapStateToProps)(GameSelector);
