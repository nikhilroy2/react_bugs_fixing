import qs from 'qs';
import _ from 'lodash';

import { changeMassStatusAction, massAssignAdmin } from '../../redux/actions/tickets';

export const generateTableHead = () => ['All', 'ID', 'User', 'Subject', 'Status', 'Assignee', 'Created', 'Last update'];

export const makeTableRow = (item) => [
  'checkbox',
  item.id,
  item.login,
  item.subject,
  {
    name: item.status_name,
    locked: item.locked,
  },
  item.assignee,
  item.created,
  item.updated,
];

export const showUnreadGenerateString = (location) => {
  const getQuery = qs.parse(location.search.slice(1));
  const emptyOrNotQuery = _.isEmpty(_.pickBy(getQuery));
  const hasInQuery = _.has(getQuery, 'unread');
  const showUnredQuery = emptyOrNotQuery ? '?unread=1' : '&unread=1';
  return hasInQuery ? '' : showUnredQuery;
};

export const generateAccessMassDrop = (access) => {
  const defaulMassActions = [
    {
      title: 'Change status',
      id: 1,
      defActionName: 'change_status',
    },
    {
      title: 'Assign',
      id: 5,
      defActionName: 'assignment',
    },
    {
      title: 'Mark as unread',
      id: 2,
      defActionName: 'unread_ticket',
    },
    {
      title: 'Close and lock',
      id: 3,
      defActionName: 'close_lock_ticket',
    },
    {
      title: 'Delete',
      id: 4,
      defActionName: 'delete_ticket',
    },
  ];

  const formatAccessMassActions = defaulMassActions?.filter((item) => Object.keys(access)
    .filter((item) => access[item])
    .includes(item.defActionName));

  return formatAccessMassActions;
};

export const submitMassAction = (props) => {
  const { key, title, values } = props;

  switch (title.trim()) {
    case 'Assign':
      return massAssignAdmin(key, values);

    case 'Change status':
      return changeMassStatusAction({ status: key, items: values });

    case 'Mark as unread':
      return changeMassStatusAction({ status: 4, items: values });

    case 'Delete':
      return changeMassStatusAction({ status: 5, items: values });

    case 'Close and lock':
      return changeMassStatusAction({ status: 6, items: values });

    default:
      break;
  }
};
