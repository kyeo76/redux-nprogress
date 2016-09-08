import React, { Component, PropTypes } from 'react';
import { Sticky } from 'react-sticky';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames/bind';

import styles from './ControlsPane.scss';

const cn = classNames.bind(styles);

export default class ControlsPane extends Component {
  static propTypes = {
    actions: PropTypes.object
  }

  render() {
    const { getRandomGif, loadMultipleGifs, reset } = this.props;

    return (
      <Sticky stickyStyle={{ zIndex: 100 }}>
        <div className={ cn('body') }>
          <div className={ cn('controls') }>
            <div className={ cn('controls__item') }>
              <button className={ cn('button', 'button--random') }
                      onClick={ getRandomGif }>
                Get random gif
              </button>
            </div>
            <div className={ cn('controls__item') }>
              <button className={ cn('button', 'button--multi') }
                      onClick={ () => loadMultipleGifs(8) }>
                Load multiple gifs
              </button>
            </div>
            <div className={ cn('controls__item') }>
              <button className={ cn('button', 'button--reset') }
                      onClick={ reset }>
                Reset
              </button>
            </div>
          </div>
        </div>
      </Sticky>
    );
  }
}
