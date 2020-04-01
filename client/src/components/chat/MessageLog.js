import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Chat.module.css';

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
        <div className={styles.msgLog}>
          {chatroomLog.map ( (msg, i) => 
            <div className={styles.messageBubble}>
              <p key={i} className={styles.user}>{msg.user}:</p>
              <p className={styles.message}>{msg.message}</p>
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