import React, { useState, useEffect } from 'react';

import styles from './Games.module.css';

const LittleBoxes = () => {

    // a series of divs will show up with random bgColors and textColors
    // at random setTimeouts, prompt will display a div:
    // "click on the { color } box" while textColor and bgColor are random (to confuse brain processing)
    // players will have to click on the appropriate div
    // once a player clicks the right div they get the points
    // then the next prompt and set of divs will appear

    return (
        <div className={styles.entirePage}>
            <h2> Little Boxes </h2>
        </div>
    );
};

export default LittleBoxes;