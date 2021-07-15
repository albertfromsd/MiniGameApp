import UserActionTypes from './user.types';


// [ Registration ]
export const registerStart = userCredentials => ({
    type: UserActionTypes.REGISTER_START,
    data: userCredentials
});

export const registerSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.REGISTER_SUCCESS,
    data: { user, additionalData }
});
export const registerFail = errorMsg => ({
    type: UserActionTypes.REGISTER_FAIL,
    data: errorMsg
});


// [ Login ]
export const emailLoginStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_LOGIN_START,
    data: emailAndPassword
});
export const loginSuccess = user => ({
    type: UserActionTypes.LOGIN_SUCCESS,
    data: user
});
export const loginFail = errorMsg => ({
    type: UserActionTypes.LOGIN_FAIL,
    data: errorMsg
});


// [ Logout ]
export const logoutStart = () => ({
    type: UserActionTypes.USER_LOGOUT_START,
});
export const logoutSuccess = () => ({
    type: UserActionTypes.USER_LOGOUT_SUCCESS,
});
export const logoutFail = error => ({
    type: UserActionTypes.USER_LOGOUT_FAIL,
});

// [ Session Check ]
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});