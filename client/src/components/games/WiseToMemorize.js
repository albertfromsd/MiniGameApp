import React, { useState, useEffect } from 'react';

import styles from './Games.module.css';

import NavBar from '../NavBar';

const WiseToMemorize = ({ socket }) => {

    // generate a random string
    // show the string for about 3-5 sex
    // string will vanish
    // input field will be invisible, not even password status
    // points will be based off time to type it
    // incorrect submissions will get negative points

    const [ string, setString ] = useState(null);
    const [ formState, setFormState ] = useState("");

    const generateRandomString = e => {
        // click button to generate random string at a random setTimeout
    }

    const submitHandler = e => {
        
    }

    return(
        <>
        <NavBar />
        <div className={styles.entirePage}>
            <h2>Wise to Memorize</h2>
        </div>
        </>
    );
};

export default WiseToMemorize;