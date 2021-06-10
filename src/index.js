import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rotateGradient from './scripts/gradient.js';

rotateGradient();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
