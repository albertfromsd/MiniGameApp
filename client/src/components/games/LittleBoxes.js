import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Games.module.css';

import NavBar from '../NavBar';

const LittleBoxes = ({ roomName }) => {

    // a series of divs will show up with random bgColors and textColors
    // at random setTimeouts, prompt will display a div:
    // "click on the { color } box" while textColor and bgColor are random (to confuse brain processing)
    // players will have to click on the appropriate div
    // once a player clicks the right div they get the points
    // then the next prompt and set of divs will appear

    return (
        <>
        <NavBar roomName={roomName} />
        <div className={styles.entirePage}>
            <h2 className={styles.textWhite}> Little Boxes </h2>
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

export default connect(mapStateToProps)(LittleBoxes);