import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppRouter from './AppRouter';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
