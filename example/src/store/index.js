import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { nprogressMiddleware } from '../../../src';

import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';

const logger = createLogger();

const enhancer = compose(
  applyMiddleware(
    thunk,
    nprogressMiddleware(),
    promiseMiddleware(),
    createLogger(),
  ),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
