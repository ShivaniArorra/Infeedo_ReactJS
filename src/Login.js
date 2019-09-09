import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';

import { userActions } from './redux/actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <Loader loaded={!this.props.loggingIn}>
                <div className="loginBox col-md-6 col-md-offset-3">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group'}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        {this.props.loggingError &&
                                <div className="alert alert-danger">{this.props.loggingError}</div>
                        }
                        <div className="alert alert-light">Note: Username: 'admin' & Password:'admin'</div>

                    </form>
                </div>
            </Loader>
        );
    }
}

function mapState(state) {
    const { loggingIn, loggingError } = state.authentication;
    return { loggingIn, loggingError };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export default connectedLoginPage;