import styles from 'styles/index.scss';

/* global window, document */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import App from './app';

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
