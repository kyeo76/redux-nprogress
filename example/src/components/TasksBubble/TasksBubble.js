import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames/bind';

import styles from './TasksBubble.scss';

const cn = classNames.bind(styles);

export default class TasksBubble extends PureComponent {
  static propTypes = {
    tasks: PropTypes.number
  }

  render() {
    const { tasks } = this.props;

    return (
      <div className={ cn('body') }>
        <div className={ cn('bubble') }>
          { tasks }
        </div>
      </div>
    );
  }
}
