import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById('app'))