import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';
import classNames from 'classnames/bind';

import styles from './TasksBubble.scss';

const cn = classNames.bind(styles);

export default class TasksBubble extends Component {
  static propTypes = {
    tasks: PropTypes.number
  }

  render() {
    const { tasks } = this.props;

    const stickyStyle = {
      width: 'initial',
      display: 'inline-block',
      zIndex: 101
    };

    return (
      <Sticky stickyStyle={ stickyStyle }>
        <div className={ cn('body') }>
          <div className={ cn('bubble') }>
            <span>Tasks counter: </span>
            <span className={ cn('counter') }>
              { tasks }
            </span>
          </div>
        </div>
      </Sticky>
    );
  }
}
