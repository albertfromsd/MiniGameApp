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
          {chatroomLog.map ( (msg, i) => 
            <>
              <p key={i} className={chatStyles.user}>{msg.user}:</p>
              <p className={chatStyles.message}>{msg.message}</p>
            </>
          )}
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