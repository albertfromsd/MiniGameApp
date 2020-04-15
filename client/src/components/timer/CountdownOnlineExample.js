import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// [ STYLING ]
import styles from '../GlobalComponents.module.css';

const CountdownTimer = ({ socket, startTime }) => {
    
    const calculateTimeLeft = () => {
        // below follows the example in online article
        const timeDifference = +new Date("2021-01-01") - +new Date();
        // below if we used .getTime() as startTime
        // const timeDifference = startTime - +new Date().getTime();

        let timeLeft = {};

        if ( timeDifference > 0 ) {
            timeLeft = {
                days: Math.floor( (timeDifference / (1000 * 60 * 60 * 24)) ),
                hours: Math.floor( (timeDifference / (1000 * 60 * 60) ) % 24 ),
                minutes: Math.floor( (timeDifference / 1000 / 60) % 60 ),
                seconds: Math.floor( (timeDifference / 1000) % 60 ),
                milliseconds: Math.floor(timeDifference),
            }
        };

        return timeLeft;
    };

    const [ timeLeft, setTimeLeft ] = useState( calculateTimeLeft() );

    useEffect( () => {
        setTimeout( () => {
            setTimeLeft( calculateTimeLeft() );
        }, 1);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            timeLeft[interval] = 0;
        };

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div className={styles.textWhite}>
            {timerComponents.length 
                ? timerComponents 
                : <span>Time's up!</span>}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        socket: state.socket,
        roomName: state.roomName,
        gameName: state.gameName,
        userName: state.userName,

        
    };
};

export default connect(mapStateToProps)(CountdownTimer);