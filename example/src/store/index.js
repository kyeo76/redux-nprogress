import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { nprogressMiddleware } from '../../../src';

import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';

const middleware = [
  thunk,
  nprogressMiddleware(),
  promiseMiddleware()
];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const enhancers = [applyMiddleware(...middleware)];

if (process.env.NODE_ENV !== 'production') {
  enhancers.push(
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
  );
}

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(...enhancers)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
