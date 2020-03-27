import React from 'react';
import { Router } from '@reach/router';

import LoginReg from './views/LoginReg';
import Lobby from './views/Lobby';
import Chatroom from './components/chat/Chat';
import HumanCalculator from './components/games/HumanCalculator';

import './MiniGameApp.css';

function MiniGameApp() {

  return (
    <>
    <Router>
      <LoginReg path="/" />
      <Lobby path="/lobby" />
      <Chatroom path="/chatroom/:roomName" />
      <HumanCalculator path="/games/humancalculator" />
    </Router>
    </>
  );
}

export default MiniGameApp;
