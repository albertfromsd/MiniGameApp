import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MiniGameApp from './MiniGameApp';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';


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
            };
        case 'SETSCOREBOARD':
            return{
                ...state,
                scoreboard : action.scoreboard,
                userList: action.userList,
                scoreList: action.scoreList
            };
        case 'LOGOUT':
            return {
                ...state,
                socket: null,
                userName: null,
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
    , document.getElementById('minigameapp')
);


serviceWorker.unregister();
