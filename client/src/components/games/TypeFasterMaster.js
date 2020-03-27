import React, { useState, useEffect } from 'react';

import styles from './Games.module.css';

const TypeFasterMaster = ({ socket })  => {

    // generate random string at random setTimeouts at random places on the screen
    // each player gets a chance to type that single word the fastest
    // 1st, 2nd and 3rd get points accordingly


    return (
        <div className={styles.entirePage}>
            <h2>Type Faster Master</h2>
        </div>
    );
};

export default TypeFasterMaster;