import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Main from './components/Main';
import '../styles/index.scss'
import { Provider } from "react-redux"
import store from "./store"

const container = document.getElementById('container');
ReactDOM.render(<Provider store={store}>
                    <Main />
                </Provider>, container );


