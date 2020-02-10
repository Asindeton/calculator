import React from 'react';
import ReactDOM from 'react-dom';
/* import { hot } from 'react-hot-loader'; */

import './index.scss';

import '@babel/polyfill';

import App from './assets/main/main';
// const AppWithHot = hot(module)(App);

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
