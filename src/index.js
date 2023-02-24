import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-alert'
import AlertMUITemplate from "react-alert-template-mui";
import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider template={AlertMUITemplate}>
      <App />
    </Provider>
  </React.StrictMode>
);