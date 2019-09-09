import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './App.css';

import Login from './Login';
import Chat from './Chat';

import { connect } from 'react-redux';

class App extends React.Component {
  
  render(){

    return (
      <div className="App">
        <header className="App-header">
          <span> React Chat </span>
        </header>
        <Router>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/chat" component={Chat} />
          {this.props.user ? <Redirect to="/chat" /> : <Redirect to="/login" />}        
        </div>
      </Router>
      </div>
    );
  }
}


function mapState(state) {
  const { user } = state.authentication;
  return { user };
}

const actionCreators = {
};

const connectedApp = connect(mapState, actionCreators)(App);

export default connectedApp;
