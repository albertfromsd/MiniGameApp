import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Games.module.css';

import NavBar from '../NavBar';

const WiseToMemorize = ({ roomName }) => {

    // generate a random string
    // show the string for about 3-5 secs
    // string will vanish
    // input field will be invisible, not even password status
    // points will be based off time to type it
    // incorrect submissions will get negative points

    const [ string, setString ] = useState(null);
    const [ formState, setFormState ] = useState("");

    const generateRandomString = e => {
        // click button to generate random string at a random setTimeout
    };

    const submitHandler = e => {
        
    };

    return(
        <>
        <NavBar roomName={roomName} />
        <div className={styles.entirePage}>
            <h2 className={styles.textWhite}>Wise to Memorize</h2>
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

export default connect(mapStateToProps)(WiseToMemorize);