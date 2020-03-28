import React, { useState, useEffect } from 'react';

import styles from './Games.module.css';

import NavBar from '../NavBar';

const PerfectTiming = () => {
    
    // DontComeInsideMe is a better version of this

    // a bar will show on the screen with a thin straight target line
    // a traveling cursor will oscillate inside the bar
    // timer will start with (5-10 sex)
    // every use has to press the button as close to the target line as possible (3-5x)
    // (negative) points will be added to game score in relation to how far the user pressed the button from the target line
    // winner is the one who has the best score (least total distance from target line)

    return (
        <>
        <NavBar />
        <div className={styles.entirePage}>
            <h2 className={styles.textWhite}>Perfect Timing</h2>
        </div>
        </>
    );
};

export default PerfectTiming;