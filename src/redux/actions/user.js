    
import { userConstants } from '../constants';

export const userActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch({ type: userConstants.LOGIN_REQUEST});

        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                const user = {
                    name:username
                }
                dispatch({ type: userConstants.LOGIN_SUCCESS, user});
            }
            else {
                dispatch({ type: userConstants.LOGIN_FAILURE});
            }

        }, 2000);

        
    };
}

function logout() {
    return { type: userConstants.LOGOUT };
}