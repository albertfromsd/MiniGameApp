import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Router } from '@reach/router';
import { connect } from 'react-redux';

import './MiniGameApp.css';

// [ VIEWS ]
import LoginReg from './views/LoginReg'; // fix later
import GameRoom from './views/GameRoom';
import Lobby from './views/Lobby';

// [ COMPONENTS ]
import MathHead from './components/games/MathHead';
import WiseToMemorize from './components/games/WiseToMemorize';
import TypeFasterMaster from './components/games/TypeFasterMaster';
import LittleBoxes from './components/games/LittleBoxes';

import DontComeInsideMe from './components/games/DontComeInsideMe';
import DropAFatShot from './components/games/DropAFatShot';

function MiniGameApp({ dispatch }) {
  const [ socket ] = useState( () => io(':8000') );

  dispatch({
    type: 'SETSOCKET',
    socket: socket,
  });

  useEffect( () => {
    socket.on('welcome', data => {
        console.log(data);
    });

    return () => {
        socket.disconnect();
    }
  }, [socket]);

  return (
    <>
      <Router>
        <Lobby path="/" 
          socket={socket}/>
        <GameRoom path="/:roomName" 
          socket={socket}/>
        <MathHead path="/:roomName/mathhead" 
          socket={socket}/>
        <WiseToMemorize path="/:roomName/wisetomemorize" 
          socket={socket}/>
        <TypeFasterMaster path="/:roomName/typefastermaster" 
          socket={socket}/>
        <LittleBoxes path="/:roomName/littleboxes" 
          socket={socket}/>
        <DontComeInsideMe path="/:roomName/dontcomeinsideme" 
          socket={socket}/>
        <DropAFatShot path="/:roomName/dropafatshot" 
          socket={socket} />
      </Router>
    </>
  );
}
function mapStateToProps(state) {
  return {
      socket: state.socket,
      userName: state.userName,
      userScore: state.userScore
  };
};

export default connect(mapStateToProps)(MiniGameApp);
