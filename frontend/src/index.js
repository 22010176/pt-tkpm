import React from 'react';
import ReactDOM from 'react-dom/client';

import './utilities/color.css'
import './utilities/size.css'

import App from './pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
