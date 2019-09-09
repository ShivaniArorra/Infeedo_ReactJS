import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import ScrollToBottom from 'react-scroll-to-bottom';

import { chatActions, userActions } from './redux/actions';
import { slide as Menu } from 'react-burger-menu'

const Message = ({message, time, isReceived}) => {
    if (isReceived) {
        return (
            <div className="incoming_msg">
                <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{message}</p>
                    <span className="time_date">{time.toString()}</span></div>
                </div>
            </div>);
    }
    else {
        return(
            <div className="outgoing_msg">
                <div className="sent_msg">
                <p>{message}</p>
                <span className="time_date">{time.toString()}</span> </div>
            </div>
        );
    }
}


class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        this.props.connect();        
    }
  
    send(message) {
        this.props.send(this.state.message);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render () {
        return (
            <div>
            <Menu>
                    <a onClick={ this.props.logout } className="menu-item--small" href="">Sign Out</a>
            </Menu>
            <div className="chatbox col-md-10 col-md-offset-3">                
                <Loader loaded={!this.props.connecting}>
                    {this.props.error && 
                        <div className="alert alert-danger">Chat connection failed</div>
                    }

                    {this.props.connected && this.props.chats &&
                        <div>
                            <ScrollToBottom className="chatMessages">
                            {this.props.chats.map(item => <Message message={item.message} 
                                                                    time={item.time} 
                                                                    isReceived={item.isReceived} 
                                                                    key={item.time.getTime()}/>)}
                            </ScrollToBottom>

                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input type="text" className="write_msg" placeholder="Type a message" name="message" value={this.state.message} onChange={this.handleChange}/>
                                    <button className="msg_send_btn" type="button" onClick={this.send}><img alt="send" src="./sent-mail.png"/></button>
                                </div>
                            </div>
                        </div>
                    }


                </Loader>

            </div>
            </div>
        )

    }
    
}

function mapState(state) {
    const { connected, connecting, error, chats } = state.chat;
    return { connected, connecting, error, chats };
}

const actionCreators = {
    connect: chatActions.connect,
    send: chatActions.send,
    clear: chatActions.clear,
    logout: userActions.logout
};

const connectedChat = connect(mapState, actionCreators)(Chat);
export default connectedChat;
