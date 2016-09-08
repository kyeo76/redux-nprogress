import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames/bind';

import styles from './Gif.scss';

const cn = classNames.bind(styles);

export default class Gif extends PureComponent {
  static propTypes = {
    item: PropTypes.object
  }

  state = {
    loaded: false
  }

  componentWillMount() {
    const {
      item: { image_url }
    } = this.props;

    const image = new Image;

    image.src = image_url;
    image.onload = () => {
      this.setState({ loaded: true })
    };
  }

  render() {
    const {
      item: {
        image_url,
        fixed_height_small_still_url
      }
    } = this.props;

    const { loaded } = this.state;

    return (
      <div className={ cn('body', { 'body--loaded': loaded }) }>
        <div className={ cn('body__wrapper') }>
          <div className={ cn('body__push') }>

            <div className={ cn('body__img', 'body__preview') }
                 style={{ backgroundImage: `url(${fixed_height_small_still_url})` }} />

            <div className={ cn('body__img') }
                 style={{ backgroundImage: `url(${image_url})` }} />

          </div>
        </div>
      </div>
    );
  }
}
