import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MessageLog from './MessageLog';
import FormMsg from './FormMsg';

import chatStyles from './Chat.module.css';

const Chat = ( { socket, userName, roomName } ) => {
  const [ chatLog, setChatLog ] = useState([]);
  const [ userInput, setUserInput ] = useState("");

  useEffect( () => {
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
      }  
    );
    setUserInput("");
  }

  return (
    <div>
      <div>
        { chatLog.map( (message, i) =>
          <div key={i} className={chatStyles.textWhite}>
            <p>{message.userName} says:</p>
            <p className={chatStyles.message}>{message.msg}</p>
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
      socket: state.socket,
      userName: state.userName,
      roomName: state.roomName,
      userScore: state.userScore,
  };
};

export default connect(mapStateToProps)(Chat);