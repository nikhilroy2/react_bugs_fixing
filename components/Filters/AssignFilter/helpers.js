import _ from 'lodash';

export const doRequest = (assignee, searchArr, location, history) => {
  let query;
  if (Number(assignee) === 0) {
    query = location.pathname;
  } else if (!_.size(searchArr)) {
    query = `${location.pathname}?assignee=${assignee}`;
  } else if (searchArr.assignee) {
    query = `${location.pathname}${location.search}`.replace(/assignee=[-+]?[0-9]+/, `assignee=${assignee}`);
  } else {
    query = `${location.pathname}${location.search}&assignee=${assignee}`;
  }
  history.push(query);
};
