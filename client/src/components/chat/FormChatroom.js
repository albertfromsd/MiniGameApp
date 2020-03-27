import React, { useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { navigate } from '@reach/router';

import styles from './Form.module.css';

const FormChatroom = () => {
    const [ chatroomName, setChatroomName ] = useState("");

    const createChatroom = e => {
        e.preventDefault();

        axios.post("http:localhost:8000/createChatroom", {
            name: chatroomName
        }, {withCredentials: true})
            .then(newRoom => {
                res.json(newRoom);
                navigate("/chatroom/"+chatroomName)
            })
            .catch(err => res.status(400).json(err));
    }

    return (
        <form onSubmit={createChatroom}>
            <label>Chatroom Name: </label>
            <input 
                type="text"
                name="name"
                value={chatroomName} 
                onChange={e=>setChatroomName(e.target.value)}
                />
        </form>
    )
}

export default FormChatroom;