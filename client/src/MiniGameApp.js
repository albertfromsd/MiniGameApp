import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Router } from '@reach/router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

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

// [TOP] [ REDUX ]
function reducer( state, action ) {
  switch(action.type) {
    case 'SETUSERNAME':
      return {
        ...state,
        userName: action.userName,
        socket: action.socket,
      };
    case 'LOGOUT':
      return {
        ...state,
        socket: null,
        userName: null,
        userScore: null,
      };
    case 'CHANGETOTALSCORE':
      return {
        ...state,
        userScore: action.userScore
      };
    default:
      return state;
  };
};

const initialState = {
  socket: null,
  nickName: null,
  userScore: null,
};

const store = createStore( reducer, initialState );
// [END] [ REDUX ]


function MiniGameApp() {
  const [ socket ] = useState( () => io(':8000') );

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
    <Provider store={store}>
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
    </Provider>
    </>
  );
}

export default MiniGameApp;
