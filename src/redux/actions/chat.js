import { chatConstants } from '../constants';
import chatHelper from '../../chatHelper';

export const chatActions = {
    connect,
    send,
    clear
};

function connect() {
    return dispatch => {
        dispatch({ type: chatConstants.CHAT_REQUEST});

        chatHelper.connectWebSocket(() => {
            //open
            dispatch({ type: chatConstants.CHAT_CONNECTED});
        }, () => {
            //error
            dispatch({ type: chatConstants.CHAT_ERROR});
        },() => {
            //close
            dispatch({ type: chatConstants.CHAT_CLEAR});
        },(messageStr) => {
            //message
            const message = {
                message: messageStr,
                time: new Date(),
                isReceived: true
            }
            setTimeout(() => {
                dispatch({ type: chatConstants.CHAT_MESSAGE, message});
            }, 200);            
        },)       
    };
}

function send(messageStr) {
    chatHelper.send(messageStr);

    //message
    const message = {
        message:messageStr,
        time: new Date()
    }

    return { type: chatConstants.CHAT_MESSAGE, message};
}


function clear() {
    chatHelper.close();
    return { type: chatConstants.CHAT_CLEAR};
}