const WS_URI = "wss://echo.websocket.org/";

let websocket = null;

function connectWebSocket(onOpen, onError, onClose, onMessage)
{
    websocket = new WebSocket(WS_URI);
    websocket.onopen = (evt) => onOpen(evt.data);
    websocket.onclose = (evt) => onClose(evt.data);
    websocket.onmessage = (evt) => onMessage(evt.data);
    websocket.onerror = (evt) => onError(evt.data);
}


function close(){
    if (websocket) {
        websocket.close();
    }
}


function send(message)
{
    websocket.send(message);
}

export default {
    connectWebSocket,
    close, 
    send
}