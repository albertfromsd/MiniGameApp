import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import axios from 'axios';

import styles from './FormMsg.module.css';

const FormMsg = ({ socket }) => {
    const [ msgState, setMsgState ] = useState({
        user: [socket.id],
        message: ""
    });

        const onChangeHandler = e => {
        setMsgState({
            user: [socket.id],
            message: e.target.value
        });
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        console.log("msg.length: "+msgState.message.length);
        if(msgState.message.length > 0) {
            // console.log("ID of Sender: "+msgState.user);
            console.log("MsgState.message: "+msgState);
            socket.emit("new message", msgState);
        } else {
            return;
        }

        setMsgState({
            user: [socket.id],
            message: ""
        });
    }

    const resetButton = () => {
        socket.emit("reset");
    }

    return (
        <form onSubmit={onSubmitHandler}>

            <input
            type="text"
            className={styles.inputMsg}
            name="message"
            value={msgState.message}
            placeholder="Enter message here"
            onChange={onChangeHandler}/>

            <button type="submit" className={styles.buttonMsg}>Send</button>
            <button onClick={resetButton} className={styles.buttonReset}>Reset</button>

        </form>
    )
}

export default FormMsg;