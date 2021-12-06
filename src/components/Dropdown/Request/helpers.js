import _ from 'lodash';
import qs from 'qs';

export const getActiveStatus = (queryString, queryRequest, withAll) => {
  const queryHas = _.has(queryString, queryRequest);

  if (queryHas) {
    const statusNumber = _.pick(queryString, queryRequest);
    return Number(statusNumber[queryRequest]);
  }

  switch (withAll) {
    case true:
      return 'all';

    case false:
      return null;

    default:
      break;
  }
};

export const doRequest = (status, searchArr, queryRequest, location, history, withAll) => {
  let query;

  switch (withAll) {
    case true:
      if (status === 'all') {
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

    case false:
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
