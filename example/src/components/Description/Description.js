import React, { Component } from 'react';
import classNames from 'classnames/bind';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

import styles from './Description.scss';

const cn = classNames.bind(styles);

const middlewareCodeString = `import { createStore, applyMiddleware } from 'redux';
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
`;

const reducerCodeString = `import { combineReducers } from 'redux';
import { nprogress } from 'redux-nprogress';
import posts from './posts';

const rootReducer = combineReducers({
  posts,
  nprogress
});

export default rootReducer;
`;

const componentCodeString = `import React from 'react';
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
}`;

const actionCodeString = `import * as PostsActionTypes from 'constants/posts';

export function loadPosts() {
  return {
    type: PostsActionTypes.LOAD_POSTS,
    nprogress: [
      PostsActionTypes.LOAD_POSTS_FULFILLED,
      PostsActionTypes.LOAD_POSTS_REJECTED,
    ],
    payload: ... // Your application specific promise middleware
  };
}`;

const manualActionCodeString = `import * as PostsActionTypes from 'constants/posts';
import { beginTask, endTask } from 'redux-nprogress';

export function loadPosts() {
  return (dispatch) => {
    dispatch(beginTask());
    dispatch({
      type: PostsActionTypes.LOAD_POSTS
    });

    fetch('/posts').then((posts) => {
      dispatch(endTask());
      dispatch({
        type: PostsActionTypes.LOAD_POSTS_SUCCESS,
        posts
      });
    });
  };
}`;

export default class Description extends Component {
  render() {
    return (
      <div>
        <div className={ cn('body') }>
          <div className={ cn('wrapper') }>
            <div className={ cn('section') }>
              <h2 className={ cn('heading') }>Install</h2>

              <SyntaxHighlighter language="bash" style={ github }>
                npm install redux-nprogress --save
              </SyntaxHighlighter>

            </div>
            <div className={ cn('section') }>
              <h2 className={ cn('heading') }>Add middleware</h2>

              <SyntaxHighlighter language="javascript" style={ github }>
                { middlewareCodeString }
              </SyntaxHighlighter>

            </div>
            <div className={ cn('section') }>
              <h2 className={ cn('heading') }>Add reducer</h2>

              <SyntaxHighlighter language="javascript" style={ github }>
                { reducerCodeString }
              </SyntaxHighlighter>

            </div>
            <div className={ cn('section') }>
              <h2 className={ cn('heading') }>Add NProgress component</h2>

              <SyntaxHighlighter language="javascript" style={ github }>
                { componentCodeString }
              </SyntaxHighlighter>

            </div>
            <div className={ cn('section') }>
              <h2 className={ cn('heading') }>Setup an action</h2>

              <SyntaxHighlighter language="javascript" style={ github }>
                { actionCodeString }
              </SyntaxHighlighter>

            </div>
            <div className={ cn('section') }>
              <h2 className={ cn('heading') }>... or dispatch manually</h2>

              <SyntaxHighlighter language="javascript" style={ github }>
                { manualActionCodeString }
              </SyntaxHighlighter>

            </div>
          </div>
        </div>
        <div className={ cn('example') }>
          <div className={ cn('wrapper') }>
            <h1 className={ cn('example__heading') }>
              Example
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
