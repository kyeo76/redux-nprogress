import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Gif from 'components/Gif';
import styles from './GifGrid.scss';

const cn = classNames.bind(styles);

export default function GifGrid({ list }) {
  return (
    <div className={ cn('body') }>
      <div className={ cn('body__wrapper') }>

        { list.map((item, i) => (
            <Gif item={ item }
                 key={ `gif-item-${item.image_url}` } />
          ))
        }

      </div>
    </div>
  );
}

GifGrid.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool
};
