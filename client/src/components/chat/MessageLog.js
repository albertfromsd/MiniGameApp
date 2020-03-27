import React, { useState, useEffect } from 'react';

import styles from './MessageLog.module.css';

const MessageLog = ({ socket }) => {
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
        <div className="msgLog">
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

export default MessageLog;
