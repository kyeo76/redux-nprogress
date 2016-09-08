import React, { Component, PropTypes } from 'react';

/* TODO.

  <div class="spinner" role="spinner">
    <div class="spinner-icon"></div>
  </div>

*/

const barStyles = {
  position: 'fixed',
  zIndex: 1031,
  top: 0,
  left: 0,
  width: '100%',
  height: '2px'
};

const pegStyles = {
  display: 'block',
  position: 'absolute',
  right: '0px',
  width: '100px',
  height: '100%',
  opacity: 1.0,
  WebkitTransform: 'rotate(3deg) translate(0px, -4px)',
      msTransform: 'rotate(3deg) translate(0px, -4px)',
        transform: 'rotate(3deg) translate(0px, -4px)'
};

export default class NProgressTemplate extends Component {
  static propTypes = {
    color: PropTypes.string
  }

  static defaultProps = {
    color: '#29d'
  }

  render() {
    const { color } = this.props;

    return (
      <div className="bar"
           role="bar"
           style={{ ...barStyles, background: color }}>

        <div className="peg"
             style={{ ...pegStyles, boxShadow: `0 0 10px ${color}, 0 0 5px ${color}` }} />
      </div>
    );
  }
}
