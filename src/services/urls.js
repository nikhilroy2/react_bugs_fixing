import qs from 'qs';
import _ from 'lodash';

import axios from 'axios';
import { IS_LOCAL } from '../utils/config';
import axiosInstance from './request';

const keys = {
  OWNER_KEY: 'qrt54f7j87fvx5o7g43eyf78dher7g92',
  // ADMIN_KEY: '7b7a7fc804a5f51',
  // WORKER_KEY: '988fdeff3492b81'
};

const DEV_KEY = IS_LOCAL ? keys[_.keys(_.pickBy(keys))] : ''; // ---> ADD REAL KEY OF DEV
export const key = DEV_KEY || null;
export const admin_id = IS_LOCAL ? 2 : null;
// If admin_id - 6, configs will be half turned off

export const getNavbarConfig = () => axiosInstance.get('/general/navbar', { params: { key, admin_id } });

export const addTicketUrl = (payload) => axiosInstance.post('/tickets/create', qs.stringify({ ...payload, key, admin_id }));

export const getTicketsUrl = (payload) => {
  const parsedPayload = _.pickBy(payload);
  return axiosInstance.get('/tickets/list', {
    params: { ...parsedPayload, key, admin_id },
  });
};

export const getTicketConfig = () => axiosInstance.get('/tickets/configuration', { params: { key, admin_id } });

export const getTicketViewUrl = (id) => axiosInstance.get(`/tickets/view/${id}`, { params: { key, admin_id } });

export const sendMessageUrl = (id, message) => axiosInstance.post(`/tickets/create-message/${id}`, qs.stringify({ message, key, admin_id }));

export const unreadMessageUrl = (id) => axiosInstance.post(`/tickets/unread/${id}`, qs.stringify({ key, admin_id }));

export const closeTicketUrl = (id, lock) => axiosInstance.post(`/tickets/close/${id}`, qs.stringify({ lock, key, admin_id }));

export const deleteTicketUrl = (id) => axiosInstance.post(`/tickets/delete/${id}`, qs.stringify({ key, admin_id }));

export const deleteMessageUrl = (id) => axiosInstance.post(`/tickets/delete-message/${id}`, qs.stringify({ key, admin_id }));

export const changeMassStatus = (payload) => axiosInstance.post('/tickets/bulk', qs.stringify({ ...payload, key, admin_id }));
export const switchViewModeUrl = (mode) => axiosInstance.post('/general/dark-mode', qs.stringify({ mode, key, admin_id }));
export const changeTicketMessage = (id, message) => axiosInstance.post(`/tickets/edit-message/${id}`, qs.stringify({ message, key, admin_id }));

// CHECK AUTORIZATION (EVERY MINUTE)
export const checkAutorization = () => axiosInstance.get('/general/check-auth', { params: { key, admin_id } });
export const getUserData = (id) => axiosInstance.get(`/users/view/${id}`, { params: { key, admin_id } });
export const createUser = (payload) => axiosInstance.post('/users/create', qs.stringify({ ...payload, key, admin_id }));
export const updateUserData = (id, payload) => axiosInstance.post(`/users/update/${id}`, qs.stringify({ ...payload, key, admin_id }));

export const getUsersList = (payload) => {
  const parsedPayload = _.pickBy(payload);
  return axiosInstance.get('/users/list', {
    params: { ...parsedPayload, key, admin_id },
  });
};

export const changeUserStatusUrl = (id, status) => axiosInstance.post(`/users/change-status/${id}`, qs.stringify({ status, key, admin_id }));

export const getUserConfigsUrl = () => axiosInstance.get('/users/configuration', { params: { key, admin_id } });
export const copyCustomRatesUrl = (from_user_id, to_user_id) => axiosInstance.post('/users/copy-custom-rates', qs.stringify({
  from_user_id, to_user_id, key, admin_id,
}));
export const setUserPasswordUrl = (id, password) => axiosInstance.post(`/users/set-password/${id}`, qs.stringify({ password, key, admin_id }));
export const massChangeStatusesUrl = (status, users) => axiosInstance.post('/users/mass-change-status', qs.stringify({
  status, users, key, admin_id,
}));
export const massResetRatesUrl = (users) => axiosInstance.post('/users/mass-reset-rates', qs.stringify({ users, key, admin_id }));
export const massCopyRatesUrl = (from_user, to_users) => axiosInstance.post('/users/mass-copy-rates', qs.stringify({
  from_user, to_users, key, admin_id,
}));
export const getUsersCustomRatesUrl = () => axiosInstance.get('/users/users-custom-rates', { params: { key, admin_id } });

export const getCustomRatesForUser = (id) => axiosInstance.get(`/users/get-custom-rates/${id}`, { params: { key, admin_id } });

export const updateCustomRates = (id, payload) => axiosInstance.post(`/users/update-custom-rates/${id}`, qs.stringify({ ...payload, key, admin_id }));

export const getExportListUrl = (payload) => {
  const parsedPayload = _.pickBy(payload);
  return axiosInstance.get('/users/export-list', { params: { ...parsedPayload, key, admin_id } });
};

export const makeExportUrl = (payload) => axiosInstance.post('/users/export-make', qs.stringify({ ...payload, key, admin_id }));

export const massAssignAdminUrl = (assigned_admin_id, tickets) => axiosInstance.post('/tickets/bulk-assignee', qs.stringify({
  assigned_admin_id, tickets, key, admin_id,
}));

export const assignAdminUrl = (ticketId, assigned_admin_id) => axiosInstance.post(`/tickets/assignee/${ticketId}`, qs.stringify({ assigned_admin_id, key, admin_id }));

// Services list
export const getServicesList = () => axiosInstance.get('/services/list-all', { params: { key, admin_id } });

// Orders
export const getOrdersUrl = (payload) => {
  const parsedPayload = _.pickBy(payload);
  return axiosInstance.get('/orders/list', {
    params: { ...parsedPayload, key, admin_id },
  });
};

export const getOrdersConfig = () => axiosInstance.get('/orders/configuration', { params: { key, admin_id } });

export const changeOrderStatusUrl = (id, status) => axiosInstance.post(`/orders/change-status/${id}`, qs.stringify({ status, key, admin_id }));

export const cancelOrderUrl = (id) => axiosInstance.post(`/orders/cancel/${id}`, qs.stringify({ key, admin_id }));

export const resendOrdersUrl = (id) => axiosInstance.post(`/orders/resend/${id}`, qs.stringify({ key, admin_id }));

export const refillOrderUrl = (id) => axiosInstance.post(`/orders/refill/${id}`, qs.stringify({ key, admin_id }));

export const setOrderPartialUrl = (id, remains) => axiosInstance.post(`/orders/set-partial/${id}`, qs.stringify({ remains, key, admin_id }));

export const setOrderRemainsUrl = (id, remains) => axiosInstance.post(`/orders/set-remains/${id}`, qs.stringify({ remains, key, admin_id }));

export const getOrderDetails = (id, type, num) => axiosInstance.get(`/orders/details/${id}`, {
  params: {
    type, num, key, admin_id,
  },
});

export const getOrdersFiltersForUsers = () => axiosInstance.get('/orders/filters/users', { params: { key, admin_id } });

export const getOrderSendInfo = (id) => axiosInstance.get(`/orders/get-send-info/${id}`, { params: { key, admin_id } });

export const changeOrderLink = (id, link) => axiosInstance.post(`/orders/change-link/${id}`, qs.stringify({ link, key, admin_id }));

export const bulkUpdateOrdersStatus = (payload) => axiosInstance.post('/orders/bulk-status', qs.stringify({ ...payload, key, admin_id }));

export const getActivityLog = (id) => axiosInstance.get(`/users/activity-log/${id}`, { params: { key, admin_id } });

export const getSignInHistory = (id, payload) => {
  const parsedPayload = _.pickBy(payload);
  return axiosInstance.get(`/users/sign-in-history/${id}`, {
    params: { ...parsedPayload, key, admin_id },
  });
};

// local users search
export const getSearchUsersList = (str) => axios.get(`http://localhost:7000/users?login=${str}`);

// Refill
export const getRefillListUrl = (payload) => {
  const parsedPayload = _.pickBy(payload);
  return axiosInstance.get('/refill/list', {
    params: { ...parsedPayload, key, admin_id },
  });
};

export const getRefillConfigUrl = () => axiosInstance.get('/refill/configuration', { params: { key, admin_id } });

export const getRefillModesUrl = (payload) => {
  const parsedPayload = _.pickBy(payload);
  return axiosInstance.get('/refill/modes', {
    params: { ...parsedPayload, key, admin_id },
  });
};

export const getRefillServicesUrl = (payload) => {
  const parsedPayload = _.pickBy(payload);
  return axiosInstance.get('/refill/services', {
    params: { ...parsedPayload, key, admin_id },
  });
};

export const viewRefillTaskUrl = (id) => axiosInstance.get(`/refill/view/${id}`, { params: { key, admin_id } });

export const superDetailsRefillUrl = (id) => axiosInstance.get(`/refill/details/${id}`, { params: { key, admin_id } });

export const resendRefillTaskUrl = (id) => axiosInstance.post(`/refill/resend/${id}`, qs.stringify({ key, admin_id }));

export const cancelRefillTaskUrl = (id) => axiosInstance.post(`/refill/cancel/${id}`, qs.stringify({ key, admin_id }));

export const changeRefillStatusUrl = (id, status) => axiosInstance.post(`/refill/change-status/${id}`, qs.stringify({ status, key, admin_id }));

export const bulkUpdateRefillStatusUrl = (payload) => axiosInstance.post('/refill/bulk-status', qs.stringify({ ...payload, key, admin_id }));

export const bulkResendRefillUrl = (tasks) => axiosInstance.post('/refill/bulk-resend', qs.stringify({ ...tasks, key, admin_id }));

export const bulkCancelRefillUrl = (tasks) => axiosInstance.post('/refill/bulk-cancel', qs.stringify({ ...tasks, key, admin_id }));
