import _ from 'lodash';
import qs from 'qs';

export const doRequest = (status, searchArr, location, history, queryRequest) => {
  let query;
  switch (location.pathname) {
    case '/admin/tickets':
      if (Number(status) === 0) {
        query = location.pathname;
      } else if (!_.size(searchArr)) {
        query = `${location.pathname}?status=${status}`;
      } else if (searchArr.status) {
        query = `${location.pathname}${location.search}`.replace(/status=[\wа-яА-ЯЁё]+/, `status=${status}`);
      } else {
        query = `${location.pathname}${location.search}&status=${status}`;
      }
      history.push(query);
      break;

    case '/admin/users':
      if (status === null) {
        delete searchArr.sort;
        delete searchArr.status;
        delete searchArr.page;
        query = `${location.pathname}?${location.search = qs.stringify(searchArr)}`;
      } else if (!_.size(searchArr)) {
        query = `${location.pathname}?status=${status}`;
      } else if (searchArr.status) {
        delete searchArr.sort;
        delete searchArr.page;
        query = `${location.pathname}?${location.search = qs.stringify(searchArr)}`.replace(/status=[\wа-яА-ЯЁё]+/, `status=${status}`);
      } else {
        delete searchArr.page;
        searchArr.status = status;
        query = `${location.pathname}?${location.search = qs.stringify(searchArr)}`;
      }
      history.push(query);
      break;

    case '/admin/ordersnew':
      if (status === null) {
        delete searchArr[queryRequest];
        query = `${location.pathname}?${(location.search = qs.stringify(searchArr))}`;
      } else if (!_.size(searchArr)) {
        query = `${location.pathname}?${queryRequest}=${status}`;
      } else if (searchArr[queryRequest]) {
        searchArr[queryRequest] = status;
        query = `${location.pathname}?${qs.stringify(searchArr)}`;
      } else {
        query = `${location.pathname}${location.search}&${queryRequest}=${status}`;
      }

      history.push(query);
      break;

    case '/admin/refill':
      if (status === null) {
        delete searchArr[queryRequest];
        query = `${location.pathname}?${(location.search = qs.stringify(searchArr))}`;
      } else if (!_.size(searchArr)) {
        query = `${location.pathname}?${queryRequest}=${status}`;
      } else if (searchArr[queryRequest]) {
        searchArr[queryRequest] = status;
        query = `${location.pathname}?${qs.stringify(searchArr)}`;
      } else {
        query = `${location.pathname}${location.search}&${queryRequest}=${status}`;
      }

      history.push(query);
      break;

    default:
      break;
  }
};
