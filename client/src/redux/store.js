import { createStore } from 'redux';
import rootReducer from './root-reducer';

const initialState = {
    socket: null,
    roomName: null,
    admin: null,
    userName: null,
    gameName : null,
};

const store = createStore( rootReducer, initialState );

export default store;