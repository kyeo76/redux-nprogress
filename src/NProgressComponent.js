import React, { PureComponent, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import { connect } from 'react-redux'
import NProgress from 'nprogress';

import NProgressTemplate from './NProgressTemplate';

class NProgressComponent extends PureComponent {
  static propTypes = {
    nprogress: PropTypes.object
  }

  componentWillMount() {
    const { nprogress, ...rest } = this.props;
    const template = renderToString(
      <NProgressTemplate {...rest} />
    );

    NProgress.configure({
      ...nprogress, template
    });
  }

  componentWillUnmount() {
    NProgress.remove();
  }

  componentWillReceiveProps(nextProps) {
    const { tasks } = nextProps;

    if (tasks === 0) {
      NProgress.done();
    } else {
      NProgress.inc();
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state, { nprogressKey }) {
  return state[nprogressKey || 'nprogress'];
}

export default connect(mapStateToProps, null)(NProgressComponent);
