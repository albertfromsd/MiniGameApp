import React from 'react';
import { Router } from '@reach/router';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; // implement later

import './MiniGameApp.css';

// [ VIEWS ]
import LoginReg from './views/LoginReg'; // fix later
import GameRoom from './views/GameRoom';
import Lobby from './views/Lobby';

// [ GAME COMPONENTS ]
import MathHead from './components/games/MathHead';
import WiseToMemorize from './components/games/WiseToMemorize';
import TypeFasterMaster from './components/games/TypeFasterMaster';
import LittleBoxes from './components/games/LittleBoxes';

import DontComeInsideMe from './components/games/DontComeInsideMe';
import DropAFatShot from './components/games/DropAFatShot';


// [TOP] REDUX NOT BEING USED AS OF 2020.03.27 @ 14:30
function reducer( state, action ) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user
      };
    case 'LOGOUT':
      return {
        ...state,
        user:null
      };
    default:
      return state;
  };
};

const initialState = {
  user: null,
  socket: null
};

const store = createStore( reducer, initialState );
// [END] REDUX NOT BEING USED AS OF 2020.03.27 @ 14:30


function MiniGameApp() {

  return (
    <>
    <Router>
      <Lobby path="/" />
      <GameRoom path="/:roomName" />
      <MathHead path="/:roomName/mathhead" socket={store.socket}/>
      <WiseToMemorize path="/:roomName/wisetomemorize" socket={store.socket}/>
      <TypeFasterMaster path="/:roomName/typefastermaster" socket={store.socket}/>
      <LittleBoxes path="/:roomName/littleboxes" socket={store.socket}/>
      <DontComeInsideMe path="/:roomName/dontcomeinsideme" socket={store.socket}/>
      <DropAFatShot path="/:roomName/dropafatshot" socket={store.socket} />
    </Router>

    </>
  );
}

export default MiniGameApp;
