import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MessageLog from './MessageLog';
import UserList from '../loginreg/UserList';
import FormMsg from './FormMsg';

import styles from './Chat.module.css';

const Chat = ( { socket, userName, roomName } ) => {

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
      <div className={styles.chatLogBox}>
        <div className={styles.chatLogMsgs}>
          <MessageLog socket={socket}/>
        </div>
        {/* [END] div chatLogMsgs */}
        <div className={styles.userList}>
          <UserList socket={socket}/>
        </div>
        {/* [END] div userList */}
      </div>
      <div className={styles.formBox}>
        <FormMsg socket={socket}/>
      </div>
      {/* [END] div formBox */}
    </div>
    // [END] div App
  );
}

function mapStateToProps(state) {
  return {
      socket: state.socket,
      userName: state.userName,
      roomName: state.roomName,
      userScore: state.userScore,
  };
};

export default connect(mapStateToProps)(Chat);