import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// [ STYLING ]
import styles from '../GlobalComponents.module.css';

const PausableTimer = ({ socket, roomName, gameName, userName, startTime }) => {
    const [ timerEvents, setTimerEvents ] = useState([]);
    // maybe timeElapsed should be a useState hook
    let timeElapsed = 0;

    const elapsedTime = () => {
        for(let i=0; i<timerEvents.length; i+=2) {
            const start = timerEvents[i];
            // bc of line below, timer adds .001s immediately on start, when it shouldn't
            const stop = timerEvents[i+1] || new Date();

            timeElapsed += ( stop - start );
        };

        return ( timeElapsed/1000 + " seconds" );
    };

    // useEffect for live timer, currently non-functional
    // useEffect( () => {
    //     setTimeout( () => {
    //         elapsedTime()
    //     }, 1);
    // }, [timeElapsed]);

    const addTimerEvent = e => {
        setTimerEvents( [
            ...timerEvents,
            new Date(),
        ] )
    };

    const timerLabel = timerEvents.length %2 == 0
        ? 'Start'
        : 'Stop';

    return (
        <div className='elapsedTime'>
            <p 
                style={{"color": "white"}}> 
                    { elapsedTime() } 
            </p>
            <button 
                onClick={addTimerEvent}
                style={{"color": "white"}}>
                    {timerLabel}
            </button>
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

export default connect(mapStateToProps)(PausableTimer);