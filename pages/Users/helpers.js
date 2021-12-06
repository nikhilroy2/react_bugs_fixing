import { onMassChangeStatus, onMassResetRates } from '../../redux/actions/users/actions';
import SetPasswordForm from './components/SetPasswordForm';
import MassCopyRatesForm from './components/MassCopyRatesForm';
import CopyRatesForm from './components/CopyRatesForm';
import UserForm from './components/UserForm';
import AddCustomRatesForm from './components/AddCustomRatesForm';
import ActivityLog from './components/ActivityLog';
import SignInTable from './components/SignInTable';

const getObjectByNameFromArray = (arr, name) => arr?.find((item) => item?.name === name);

export const generateTableHead = (fields = {}, columns) => {
  const tableHead = [
    { title: 'All' },
    { title: 'ID', ...getObjectByNameFromArray(columns, 'id') },
    { title: 'Username' },
    { title: 'Email' },
    { title: 'Balance', ...getObjectByNameFromArray(columns, 'balance') },
    { title: 'Spent', ...getObjectByNameFromArray(columns, 'spent') },
    { title: 'Status' },
    { title: 'Created', ...getObjectByNameFromArray(columns, 'date') },
    { title: 'Last auth', ...getObjectByNameFromArray(columns, 'lastlogin') },
    { title: 'Rates', ...getObjectByNameFromArray(columns, 'custom_rates') },
    { title: '' },
  ];

  if (fields?.skype) {
    tableHead.splice(4, 0, { title: 'Skype' });
  }

  return fields && tableHead;
};

export const makeTableRow = (item, fields = {}) => {
  const tableRow = [
    'checkbox',
    item.id,
    item.username,
    'email',
    item.balance,
    item.spent,
    item.status_title,
    item.created,
    item.last_login || '',
    'rates',
    'actions',
  ];

  if (fields?.skype) {
    tableRow.splice(4, 0, item?.skype);
  }

  return fields && tableRow;
};

export const openAddUser = (setOpen, setSettings) => {
  setSettings((prev) => ({
    ...prev,
    mode: 0,
    title: 'Add user',
    okBtnText: 'Add user',
    cancelBtnText: 'Cancel',
  }));

  setOpen(true);
};

export const openEditUser = (setOpen, setSetting, id) => {
  setSetting((prev) => ({
    ...prev,
    mode: 1,
    title: `Edit user (ID: ${id})`,
    okBtnText: 'Save changes',
    cancelBtnText: 'Cancel',
    userId: id,
  }));

  setOpen(true);
};
export const generateActiveClass = (values, item) => (values.includes(item.id) && item.is_inactive === true
  ? 'active grey'
  : values.includes(item.id)
    ? 'active'
    : item.is_inactive === true
      ? 'grey'
      : '');

export const getMassAccess = (access) => {
  const massAccessArr = [];
  const items = [];

  for (const obj in access) {
    if (obj.indexOf('mass') !== -1 && access[obj] === true) {
      massAccessArr.push(obj);
    }
  }
  massAccessArr.forEach((el) => {
    if (el.includes('mass_change_status')) {
      items.push({ title: 'Suspend all', id: items.length + 1 });
      items.push({ title: 'Activate all', id: items.length + 1 });
    } else if (el.includes('reset')) {
      items.push({ title: 'Reset custom rates', id: items.length + 1 });
    } else if (el.includes('copy')) {
      items.push({ title: 'Copy rates from user', id: items.length + 1 });
    }
  });

  // return items.length > 2 ? [...items, ...items.splice(2, 1)] : items;
  return items;
};

export const getUserAccess = (element, config = {}) => {
  const { access } = element;
  const userAccess = [];

  for (const obj in access) {
    if (access[obj] === true) {
      userAccess.push(obj);
    }
  }

  if (config?.sign_in_history) {
    access.sign_in_history = true;
  }

  const defaultAccess = [
    {
      title: 'Edit user',
      id: 0,
      defActionName: 'update_user',
    },
    {
      title: 'Set password',
      id: 1,
      defActionName: 'set_password',
    },
    {
      title: 'Copy rates',
      id: 2,
      defActionName: 'copy_custom_rates',
    },
    {
      title: 'Sign-in history',
      id: 6,
      defActionName: 'sign_in_history',
    },
    {
      title: element.is_inactive === true ? 'Activate user' : 'Suspend user',
      id: 3,
      defActionName: 'change_status',
    },
    {
      title: 'Sign in as user',
      id: 4,
      defActionName: 'auth',
    },
    {
      title: 'Activity log',
      id: 5,
      defActionName: 'activity_log',
    },
  ];

  const formatAccessMassActions = defaultAccess?.filter((item) => Object.keys(access)
    .filter((item) => access[item])
    .includes(item.defActionName));

  return formatAccessMassActions;
};

export const toggleRates = (setUsername, setModalText, setRatesOpen, item) => {
  if (item) {
    setUsername(`${item.username} (${item.custom_rates})`);
    setModalText({
      title: `Copy custom rates (ID: ${item.id})`,
      okBtnText: 'Copy rates',
      cancelBtnText: 'Cancel',
    });
  }
  setRatesOpen((prev) => !prev);
};

export const submitMassAction = (props) => {
  const { title, values, setUsers } = props;

  switch (title.trim()) {
    case 'Suspend all':
      setUsers([]);
      return onMassChangeStatus(1, values);

    case 'Activate all':
      setUsers([]);
      return onMassChangeStatus(0, values);

    case 'Reset custom rates':
      setUsers([]);
      return onMassResetRates(values);

    default:
      break;
  }
};

export const getModal = (index, user = { id: -1 }) => {
  const modals = [
    {
      modalText: {
        title: `Set password (ID: ${user.id})`,
        okBtnText: 'Set password',
        cancelBtnText: 'Cancel',
      },
      Form: SetPasswordForm,
      user,
    },
    {
      modalText: {
        title: 'Add user',
        okBtnText: 'Add user',
        cancelBtnText: 'Cancel',
      },
      Form: UserForm,
      mode: 0,
      user,
    },
    {
      modalText: {
        title: `Edit user (ID: ${user.id})`,
        okBtnText: 'Save changes',
        cancelBtnText: 'Cancel',
      },
      Form: UserForm,
      mode: 1,
      user,
      forEditUser: true,
    },
    {
      modalText: {
        title: `Copy custom rates (ID: ${user.id})`,
        okBtnText: 'Copy rates',
        cancelBtnText: 'Cancel',
      },
      user,
      Form: CopyRatesForm,
    },
    {
      modalText: {
        title: 'Copy custom rates',
        okBtnText: 'Copy rates',
        cancelBtnText: 'Cancel',
      },
      Form: MassCopyRatesForm,
    },
    {
      modalText: {
        title: `Edit custom rates (ID: ${user.id})`,
        okBtnText: 'Save changes',
        cancelBtnText: 'Cancel',
        deleteBtnText: 'Delete all',
      },
      Form: AddCustomRatesForm,
      user,
      size: 'lg',
      forAddRates: true,
    },
    {
      modalText: {
        title: `Activity log (ID: ${user.id})`,
        okBtnText: '',
        cancelBtnText: 'Ok',
      },
      Form: ActivityLog,
      user,
      forAddRates: true,
      hideSubmitBtn: true,
    },
    {
      modalText: {
        title: 'User sign-in history',
        okBtnText: '',
        cancelBtnText: '',
      },
      Form: SignInTable,
      user,
      forAddRates: true,
      hideSubmitBtn: true,
      hideFooter: true,
    },
  ];

  return modals[index];
};

export const detectDataValue = (userRates, ratesValues, wasAddRates) => {
  if (!wasAddRates) {
    return true;
  } if (userRates?.length !== 0 || ratesValues?.length !== 0) {
    return false;
  }
  return false;
};
