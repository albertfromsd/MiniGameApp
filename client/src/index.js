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
        case 'SETSOCKET':
            return {
            ...state,
            socket: action.socket
            };
        case 'SETUSERNAME':
            return {
            ...state,
            userName: action.userName,
            };
        case 'SETROOMNAME':
            return {
            ...state,
            roomName: action.roomName,
            };
        case 'SETGAMENAME':
            return{
                ...state,
                gameName : action.gameName,
            }
        case 'CHANGETOTALSCORE':
            return {
            ...state,
            userScore: action.userScore
            };
        case 'LOGOUT':
            return {
                ...state,
                socket: null,
                userName: null,
                userScore: null,
            };
        default:
            return state;
    };
  };
  
  const initialState = {
    socket: null,
    userName: null,
    userScore: null,
    roomName: null,
    gameName : null
  };
  
  const store = createStore( reducer, initialState );
  // [END] [ REDUX ]

ReactDOM.render(
    <Provider store={store}>
        <MiniGameApp />
    </Provider>
    , document.getElementById('minigameapp'));


serviceWorker.unregister();
