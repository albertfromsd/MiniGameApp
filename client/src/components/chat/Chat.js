import React, { useState, useEffect } from 'react';

import MessageLog from './MessageLog';
import UserList from '../loginreg/UserList';
import FormMsg from './FormMsg';

import styles from './Chat.module.css';

const Chatroom = ({socket, roomName}) => {

  useEffect( () => {
    socket.on('welcome', data => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    }
  }, [socket]);

  return (
    <div className="App">
      <h1>Chatroom App</h1>
      <div className="chatLogBox">
        <div className="chatLogMsgs">
          <MessageLog socket={socket}/>
        </div>
        {/* [END] div chatLogMsgs */}
        <div className="userList">
          <UserList socket={socket}/>
        </div>
        {/* [END] div userList */}
      </div>
      <div className="formBox">
        <FormMsg socket={socket}/>
      </div>
      {/* [END] div formBox */}
    </div>
    // [END] div App
  );
}

export default Chatroom;
