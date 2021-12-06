import axios from 'axios';
import { IS_LOCAL } from '../utils/config';

// TEST API HOST
export const API_HOST = IS_LOCAL
  ? 'https://example.dev/admin/api'
  : `${window.location.protocol}//${window.location.host}/admin/api`;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.xsrfCookieName = '_csrf-frontend';

const instance = axios.create({
  baseURL: API_HOST,
});

instance.interceptors.request.use(
  (config) => {
    if (config.headers.Authorization) {
      return config;
    }

    // const accessToken = localStorage.getItem('token');
    // if (accessToken) {
    //     config.headers.Authorization = `Bearer ${accessToken}`
    // }

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = `${window.location.origin}/admin/logout?redirect=${window.location.pathname}${
        window.location.search ? `${window.location.search}` : ''
      }`;
    }

    return Promise.reject(error.response);
  },
);

export default instance;
