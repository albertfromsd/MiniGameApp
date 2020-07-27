import { gameActionTypes } from './game.types';


const initialState = {
    socket: null,
    roomName: null,
    admin: null,
    gameName : null,
    scoreboard: null,
    userList: null,
    scoreList: null,
};

const gameReducer = ( state=initialState, action ) => {
    switch(action.type) {
        case gameActionTypes.SET_SOCKET:
            return {
            ...state,
            socket: action.socket
            };
        case gameActionTypes.SET_ADMIN:
            return {
                ...state,
                admin: action.admin
            };
        case gameActionTypes.SET_ROOMNAME:
            return {
                ...state,
                roomName: action.roomName,
            };
        case gameActionTypes.SET_GAMENAME:
            return{
                ...state,
                gameName : action.gameName,
            };
        case gameActionTypes.SET_SCOREBOARD:
            return{
                ...state,
                scoreboard : action.scoreboard,
                userList: action.userList,
                scoreList: action.scoreList
            };
        default:
            return state;
    };
};

export default gameReducer;