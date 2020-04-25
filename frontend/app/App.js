import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, withRouter, Route, Link, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'
import Logo from './components/assets/Logo.png'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            snackmsg: false,
            displayed_form: '',
            redirectToReferrer: false,
            logged_in: localStorage.getItem('token') ? true : false,
        }
        this.senddata = this.senddata.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }
    senddata(e) {
        e.preventDefault();
        e.stopPropagation();

        let payload = {
            username: this.state.username,
            password: this.state.password
        };

        axios
            .post("http://127.0.0.1:8000/token-auth/", payload)
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: ''
                });
                this.checkLogin();
            })
            .catch(err => {
                console.log("Error Message:", err);
                this.setState({
                    snackmsg: true
                })
            });
    };

    checkLogin() {
        Auth.authenticate(() => {
            this.setState({
                redirectToReferrer: true
            })
        });
        if (this.state.logged_in) {
            sessionStorage.setItem(
                "currLink", "/home"
            );
            setTimeout(() => {
                this.props.history.push(sessionStorage.getItem("currLink"));
            }, 100);
        }
    }

    handleClose(e) {
        this.setState({ snackmsg: false })
    };

    handleinputchange(data) {
        this.setState({ [data.target.name]: data.target.value });
    };

    render() {
        if (this.state.redirectToReferrer === true) {
            return (
                <Redirect to='/home' />
            )
        }
        else return (
            <Fragment>

                <Snackbar open={this.state.snackmsg} autoHideDuration={2000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        Invalid Login Credentials!
                    </Alert>
                </Snackbar>
                <div className="login-body">
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        <div className="container">
                            <Link className="navbar-brand" to={"/"}>
                                <img
                                    src={Logo}
                                    width="100"
                                    className="img-thumbnail"
                                />
                            </Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/"}>Login</Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <form onSubmit={this.senddata}>
                                <h3>Sign In</h3>

                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="name"
                                        name="username"
                                        className="form-control login-input"
                                        id="username"
                                        placeholder="Username"
                                        maxLength="40"
                                        onChange={e => this.handleinputchange(e)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control login-input"
                                        id="password"
                                        minLength="4"
                                        maxLength="30"
                                        placeholder="Password"
                                        onChange={e =>
                                            this.handleinputchange(e)
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>


            </Fragment>
        );
    }
}

const Auth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
    },
    signout(cb) {
        this.isAuthenticated = false
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/' />
    )}
    />
)


class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navigate: false
        }
    }

    render() {
        if (this.state.navigate) {
            return <Redirect to="/" push={true} />
        }
        return (
            <Fragment>
                <Header />
                <Home />
            </Fragment>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false
        }
    }

    render() {
        return (
            <Router>

                <Switch>
                    <Route exact path='/' component={LoginForm} />
                    <PrivateRoute path="/home" component={Main} />
                </Switch>

            </Router >
        );
    }

}

export default App;