import { chatConstants } from '../constants';

const initialState = { connected: false,
                       connecting: false,  
                       error: false,
                       chats: null
                    };

export function chat(state = initialState, action) {
  switch (action.type) {
    case chatConstants.CHAT_REQUEST:
      return {
        connected: false,
        connecting: true,
        error: false,
        chats:null
      };
    case chatConstants.CHAT_CONNECTED:
        return {
            connected: true,
            connecting: false,
            error: false,
            chats:[]
          };
    case chatConstants.CHAT_MESSAGE:
        return {
            connected: true,
            connecting: false,
            error: false,
            chats: [...state.chats, action.message]
          };
    case chatConstants.CHAT_ERROR:
        return {
            connected: false,
            connecting: false,
            error: true,
            chats:[]
          };
    case chatConstants.CHAT_CLEAR:
        return {
            connected: false,
            connecting: false,
            error: false,
            chats:null
          };
    default:
      return state
  }
}