import React, { PropTypes, Component } from 'react';
import { StickyContainer } from 'react-sticky';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NProgress } from '../../../src';

import * as ActionCreators from '../actions/gifs';

import Header from 'components/Header';
import Layout from 'components/Layout';
import TasksBubble from 'components/TasksBubble';
import Description from 'components/Description';
import ControlsPane from 'components/ControlsPane';
import GifGrid from 'components/GifGrid';

require('style!css!normalize.css/normalize.css');
require('style!css!../styles/index.css');

class App extends Component {
  componentDidMount() {
    const {
      actions: { loadMultipleGifs }
    } = this.props;

    loadMultipleGifs(8);
  }

  render() {
    const { list, loading, tasks, actions } = this.props;

    return (
      <div>
        <NProgress color="rgba(255, 0, 0, 0.5)" />

        <TasksBubble tasks={ tasks } />

        <Header />
        <Description />

        <Layout>
          <StickyContainer>
            <ControlsPane loading={ loading } {...actions} />
            <GifGrid list={ list } loading={ loading } />
          </StickyContainer>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool,
  list: PropTypes.array,
  getRandomGif: PropTypes.func
};

function mapStateToProps({ gifs, nprogress: { tasks } }) {
  return { ...gifs, tasks };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
