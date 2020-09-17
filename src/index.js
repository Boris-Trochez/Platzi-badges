import React from 'react';
import reactDOM from 'react-dom'; 
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './global.css';


const container = document.getElementById('app');

reactDOM.render(<App />, container);

