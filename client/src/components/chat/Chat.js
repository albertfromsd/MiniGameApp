import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

import chatStyles from './Chat.module.css';

const Chat = ( { socket, userName, roomName } ) => {
  const [ chatLog, setChatLog ] = useState([]);
  const [ userInput, setUserInput ] = useState("");

  // ADMIN STATE BOOLEAN
  const [ adminState, setAdminState ] = useState(false);

  useEffect( () => {
    if (  userName == null || 
          userName.length < 1 || 
          userName == undefined || 
          roomName == null || 
          roomName.length < 1 || 
          roomName == undefined ) {
        navigate('/');
    };

    socket.on('updateChatLog', data => {
      setChatLog(data);
    });

  }, [socket, roomName, userName]);

  const sendMsg = e => {
    e.preventDefault();
    let now = new Date();

    socket.emit("newMsg", 
      {
        roomName,
        userName,
        userInput,
        timestamp: now,
      }  
    );
    setUserInput("");

  };

  return (
    <div style={{'height' : '60%'}}>
      <div className={chatStyles.chatBox}>
        { chatLog.map( (message, i) =>
          message.userName === userName
          ? <div key={i} className={chatStyles.sentMessage}>
              <p style={{'backgroundColor' : 'royalblue'}}> {message.msg} </p>
            </div>
          : <div key={i} className={chatStyles.recievedMessage}>
            <p style={{'backgroundColor' : 'silver'}}> {message.userName.toLocaleUpperCase()} : {message.msg}</p>
            </div>
        )}
      </div>
      <form onSubmit={sendMsg}>
        <input type="text"
          placeholder="Type message here"
          value={userInput}
          onChange={e=>setUserInput(e.target.value)}/>
          <input type="submit" value="Send"/>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
      userName: state.userName,
  };
};

export default connect(mapStateToProps)(Chat);