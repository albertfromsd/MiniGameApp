import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Games.module.css';

const Scoreboard = ({ socket, userName, roomName, dispatch }) => {
    const [ scoreBoard, setScoreboard ] = useState([]);

    useEffect( () => {
        socket.on("updateScoreboard", data => {
            setScoreboard(data);
        });

    }, [socket, roomName, userName])

    return (
        <div>
            
        </div>
    )
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        userName: state.userName,
        userScore: state.userScore,
    };
};

export default connect(mapStateToProps)(Scoreboard);
