import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Games.module.css';

import NavBar from '../NavBar';

const DropAFatShot = ({ roomName }) => {

    // have a static target of a specific size
    // each player gets a turn;
    // each player clicks and drags a start point and end point, drawing a line
    // the shot travels in the same line as the one drawn
    // as the bullet travels across the target, it covers a certain surface area
    // whosever bullet covers the most surface area is the winner

    return (
        <>
        <NavBar roomName={roomName} />
        <div className={styles.entirePage}>
            <h2 className={styles.textWhite}> Drop a Fat Shot </h2>
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

export default connect(mapStateToProps)(DropAFatShot);