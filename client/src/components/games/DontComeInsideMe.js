import React, { useState, useEffect } from 'react';

import styles from './Games.module.css';

import NavBar from '../NavBar';

const DontComeInsideMe = () => {

    // at random setTimeout, prompt will shout "Come to me!"
    // bar will display with a target line towards the end of the bar, with a red forbidden area
    // aiming bar will move at random speeds
    // player must click button before the aiming line passes the target line
    // player who gets closest to the target line without passing into the red area gets the points

    return (
        <>
        <NavBar />
        <div className={styles.entirePage}>
            <h2 className={styles.textWhite}>Please Don't Come Inside Me!</h2>
        </div>
        </>
    );
};

export default DontComeInsideMe;