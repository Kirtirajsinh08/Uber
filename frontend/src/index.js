import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import Login from './components/Login';
// import Register from './components/Register';
// import Signup from './components/Signup';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import RiderPage from './components/RiderPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster />
    {/* <Login /> */}
    <App />
    {/* <Register /> */}
    {/* <Signup /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
