import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';

import Github from 'components/Github';

import styles from './Header.scss';

const cn = classNames.bind(styles);

export default class Header extends PureComponent {
  render() {
    return (
      <div className={ cn('body') }>
        <h1 className={ cn('title') }>
          { "Redux "}
          <span className={ cn('nprogress') }>NProgress</span>
        </h1>
        <span className={ cn('description') }>
          Middleware, Component & Actions
        </span>
        <Github className={ cn('github') } />
      </div>
    );
  }
}
