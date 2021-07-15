import { userActionTypes } from './user.types';

const initialState = {
    socket: null,
    userName: null
}

const userReducer = ( state=initialState, action ) => {
    switch(action.type) {
        case userActionTypes.SET_SOCKET:
            return {
            ...state,
            socket: action.socket
            }
        case userActionTypes.SET_USERNAME:
            return {
            ...state,
            userName: action.userName,
            }
        case userActionTypes.LOGOUT:
            return {
                ...state,
                socket: null,
                userName: null,
                roomName: null,
                gameName: null,
            }
        default:
            return state;
    }
}

export default userReducer;