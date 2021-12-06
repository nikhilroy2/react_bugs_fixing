import './Polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import '../assets/scss/index.scss';

import App from './App';
import reduxStore from './store';
import { IS_PROD, DEV_PANELS } from '../utils/config';
import { errorsIgnore, notAllowUrls } from '../utils/sentry-config';

import './i18n';

IS_PROD
  && DEV_PANELS.includes(window.location.host) === false
  && Sentry.init({
    dsn: 'https://04607f7a8a734803b082d6a9c1006303@o149500.ingest.sentry.io/5195954',
    ignoreErrors: errorsIgnore,
    denyUrls: notAllowUrls,
  });

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
