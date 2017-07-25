import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { nprogressMiddleware } from '../../../src';

import rootReducer from '../reducers';

const middleware = [
  thunk,
  nprogressMiddleware({
    resultActionTypeSuffixes: ['SUCCESS', 'ERROR']
  }),
  promiseMiddleware({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
  })
];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const enhancers = [applyMiddleware(...middleware)];

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
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
