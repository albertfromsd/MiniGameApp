import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MiniGameApp from './MiniGameApp';

import './index.css';

import * as serviceWorker from './serviceWorker';

// [TOP] [ REDUX ]
function reducer( state, action ) {
    switch(action.type) {
      case 'SETUSERNAME':
        return {
          ...state,
          userName: action.userName,
        };
      case 'SETSOCKET':
        return {
          ...state,
          socket: action.socket
        }
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
    userName: null,
    userScore: null,
  };
  
  const store = createStore( reducer, initialState );
  // [END] [ REDUX ]

ReactDOM.render(
    <Provider store={store}>
        <MiniGameApp />
    </Provider>
    , document.getElementById('minigameapp'));


serviceWorker.unregister();
