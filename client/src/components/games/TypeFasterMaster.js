import React, { useState, useEffect } from 'react';

import styles from './Games.module.css';

import NavBar from '../NavBar';

const TypeFasterMaster = ({ socket })  => {

    // generate random string at random setTimeouts at random places on the screen
    // each player gets a chance to type that single word the fastest
    // 1st, 2nd and 3rd get points accordingly


    return (
        <>
        <NavBar />
        <div className={styles.entirePage}>
            <h2>Type Faster Master</h2>
        </div>
        </>
    );
};

export default TypeFasterMaster;