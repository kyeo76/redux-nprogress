import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;

    render(
      <AppContainer>
         <NextRoot />
      </AppContainer>,
      rootEl
    );
  });
}
