import _ from 'lodash';

export const getActiveStatus = (queryString, path, queryRequest) => {
  const queryHas = _.has(queryString, queryRequest);

  if (queryHas) {
    const statusNumber = _.pick(queryString, queryRequest);
    return Number(statusNumber[queryRequest]);
  }

  return path === '/admin/users' || path === '/admin/ordersnew' ? null : 0;
};

export const getActiveAssign = (queryString, path) => {
  const queryHas = _.has(queryString, 'assignee');

  if (queryHas) {
    const statusNumber = _.pick(queryString, 'assignee');
    return Number(statusNumber.assignee);
  }

  return path === '/admin/users' ? null : 0;
};

export const generateStatuses = (submenuStatuses) => {
  if (submenuStatuses) {
    return submenuStatuses;
  }

  return ['Pending', 'Answered', 'Closed'];
};
