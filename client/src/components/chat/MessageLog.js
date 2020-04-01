import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import chatStyles from './Chat.module.css';

const MessageLog = ({ socket, userName, roomName }) => {
  
    const [ chatroomLog, setChatroomLog ] = useState([]);

      useEffect( () => {

        socket.on('refreshChatLog', newChatLog => {
          setChatroomLog(newChatLog);
        });

        return () => {
          socket.disconnect(socket.id);
        }

      }, [socket]);

    return (
        <>
        <div className={chatStyles.chatLogMsgs} >
          {chatroomLog.map ( (msg, i) => 
            <div className={chatStyles.messageBubble}>
              <p key={i} className={chatStyles.user}>{msg.user}:</p>
              <p className={chatStyles.message}>{msg.message}</p>
            </div>
          )}
        </div>
        </>
    );

};

function mapStateToProps(state) {
  return {
      socket: state.socket,
      userName: state.userName,
      roomName: state.roomName,
      userScore: state.userScore,
  };
};

export default connect(mapStateToProps)(MessageLog);