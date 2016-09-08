# WIP: Redux NProgress

Redux Middleware, Component & Actions for the most popular [progress bar](https://github.com/rstacruz/nprogress).

Tests will be available soon.

[Demo](http://jaredt67.github.io/redux-nprogress/)


## Installation

`npm i --save redux-nprogress`


## Usage

### Middleware

Import the `nprogressMiddleware` and include it in `applyMiddleware` when creating the Redux store.

Example store:

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { nprogressMiddleware } from 'redux-nprogress';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from 'reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    nprogressMiddleware(),
    promiseMiddleware(),
    createLogger()
  )
);

export default store;
```


### Reducer

Import reducer and assign it to the `nporgress` key in your root reducer.

Example root reducer:

```
import { combineReducers } from 'redux';
import { nprogress } from 'redux-nprogress';
import posts from './posts';

const rootReducer = combineReducers({
  posts,
  nprogress
});

export default rootReducer;
```


### Actions

To use the middleware, dispatch an action with `nprogress` property.

```
export function loadPosts() {
  return {
    type: 'LOAD_POSTS',
    nprogress: [
      'LOAD_POSTS_FULFILLED',
      'LOAD_POSTS_REJECTED'
    ],
    payload: ... // Your application specific promise middleware
  };
}
```


### Component

Add `NProgress` component to the root component of your application.

Example:

```
import React from 'react';
import { NProgress } from 'redux-nprogress';
import Header from 'components/Header';

export default function App({ children }) {
  return (
    <div>
      <NProgress />
      <Header />

      { children }

    </div>
  );
}
```

More docs will be available soon.
For now just check the [source](https://github.com/jaredt67/redux-nprogress/tree/master/src).
