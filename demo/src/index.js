import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider, createClient } from 'urql';

// 1. Create client with auth setup
const client = createClient({
  url: 'https://threed-test-api.herokuapp.com/graphql',
  fetchOptions: () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
});

// 2. Wrap our App in urql Provider
ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
