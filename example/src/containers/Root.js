import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store'
import App from './App';
import DevTools from './DevTools';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
);
