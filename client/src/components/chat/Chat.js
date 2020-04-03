import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MessageLog from './MessageLog';
import FormMsg from './FormMsg';

import chatStyles from './Chat.module.css';

const Chat = ( { socket, userName, roomName } ) => {

  useEffect( () => {
    socket.on('welcome', data => {
      console.log(data);
    });

  }, [socket]);

  return (
    <>
      <div>
        <MessageLog socket={socket} className={chatStyles.chatLogMsgs}/>
        <FormMsg socket={socket} />
      </div>
    </>
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