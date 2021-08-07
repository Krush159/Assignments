import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core";
import { Provider } from 'react-redux';
import theme from './theme';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

