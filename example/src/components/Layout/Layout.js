import React, { PropTypes } from 'react';
import styles from './Layout.scss';

export default function Layout({ children }) {
  return (
    <div className={ styles.body }>

      { children }

    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
