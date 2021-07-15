const rootReducer = ( state, action ) => {
    switch(action.type) {
        case 'SETSOCKET':
            return {
            ...state,
            socket: action.socket
            };
        case 'SETADMIN':
            return {
                ...state,
                admin: action.admin
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
        case 'SETUSERNAME':
            return {
            ...state,
            userName: action.userName,
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
                roomName: null,
                gameName: null,
            };
        default:
            return state;
    };
};

export default rootReducer;
