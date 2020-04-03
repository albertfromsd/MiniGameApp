import React from 'react';
import { Router } from '@reach/router';
import { connect } from 'react-redux';

// [ STYLES ]
import './MiniGameApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// [ VIEWS ]
import LoginReg from './views/LoginReg'; // fix later
import GameRoom from './views/GameRoom';
import Lobby from './views/Lobby';

function MiniGameApp({ dispatch }) {


  return (
    <>
      <Router>
        <Lobby path="/" />
        <GameRoom path="/:roomName/*" />
      </Router>
    </>
  );
};

function mapStateToProps(state) {
  return {
      userName: state.userName,
      userScore: state.userScore,
  };
};

export default connect(mapStateToProps)(MiniGameApp);
