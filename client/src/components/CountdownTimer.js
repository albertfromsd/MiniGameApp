import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// [ STYLING ]
import styles from './GlobalComponents.module.css';

const CountdownTimer = ({ startTime }) => {
    const calculateTimeLeft = () => {
        // below follows the example in online article
        const timeDifference = +new Date() - +new Date();

        // below if we used .getTime() as startTime
        // const timeDifference = startTime - +new Date().getTime();
        let timeLeft = {};

        if ( timeDifference > 0 ) {
            timeLeft = {
                days: Math.floor( (timeDifference / (1000 * 60 * 60 * 24)) ),
                hours: Math.floor( (timeDifference / (1000 * 60 * 60) ) % 24 ),
                minutes: Math.floor( (timeDifference / 1000 / 60) % 60 ),
                seconds: Math.floor( (timeDifference / 1000) % 60 ),
                milliseconds: Math.floor( (timeDifference / 1000) ),
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
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div className={styles.textWhite}>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        socket: state.socket,
        userName: state.userName,
    };
};

export default connect(mapStateToProps)(CountdownTimer);