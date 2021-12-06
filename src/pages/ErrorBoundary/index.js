/* eslint react/state-in-constructor: 'off' */
/* eslint no-unused-vars: 'off' */
/* eslint react/prop-types: 'off' */
import React, { Component } from 'react';

import CrashPage from './component';

import { IS_PROD } from '../../utils/config';

export default class ErrorBoundary extends Component {
    state = { hasError: false };

    componentDidCatch(error, info) {
      if (IS_PROD) {
        this.setState({ hasError: true });
      }
    }

    render() {
      if (this.state.hasError) {
        return <CrashPage history={this.props.history} />;
      }

      return this.props.children;
    }
}
