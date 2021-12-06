/* eslint consistent-return: "off" */
import {
  changeOrderStatusAction,
  cancelOrderAction,
  getOrderSendInfoAction,
  resendOrderAction,
} from '../../redux/actions/orders';
import { settingModalHelper } from './components/SetEditForm/helpers';

export const usersDrop = [
  { id: null, title: 'All(3232323)' },
  { id: 0, title: 'None(232)' },
  { id: 1, title: 'API(2)' },
  { id: 2, title: 'Mass(2323213)' },
  { id: 3, title: 'Subscription(0)' },
  { id: 4, title: 'Drip-feed(0)' },
  { id: 5, title: 'refiller(0)' },
];

export const generateTableHead = (access = {}) => [
  'All',
  access.user_id && 'ID',
  'User',
  access.cost && 'Charge',
  'Link',
  access.start_count && 'Start count',
  'Quantity',
  access.service && 'Service',
  access.status && 'Status',
  'Remains',
  access.date && 'Created',
  access.mode && 'Mode',
  '',
];

export const makeTableRow = (item, access = {}) => [
  'checkbox',
  access.user_id && item.id,
  item.user,
  access.cost && item.cost_original,
  item.link_url,
  access.start_count && item.start_count,
  item.count,
  access.service && item.service_name,
  access.status && item.status_name,
  item.remains.toString().replace(/-/, '+'),
  access.date && '2020-06-01 13:46:35',
  access.mode && item.mode_name,
  'actions',
];

export const generateAccessMassDrop = (access = {}) => {
  const defaulMassActions = [
    {
      title: 'Change status',
      id: 1,
      defActionName: 'change_status',
    },
    {
      title: 'Cancel and refund',
      id: 2,
      defActionName: 'cancel_and_refund',
    },
  ];

  const formatAccessMassActions = defaulMassActions?.filter((item) => Object.keys(access)
    .filter((item) => access[item])
    .includes(item.defActionName));

  return formatAccessMassActions;
};

export const generateAccessItemDrop = (access = {}) => {
  const defaulMassActions = [
    {
      title: 'Error details',
      id: 1,
      defActionName: 'error_details',
    },
    {
      title: 'Fail details',
      id: 2,
      defActionName: 'fail_details',
    },
    {
      title: 'Order details',
      id: 3,
      defActionName: 'order_details',
    },
    {
      title: 'Details for superadmin',
      id: 4,
      defActionName: 'superadmin_order_details',
    },
    {
      title: 'Resend order',
      id: 5,
      defActionName: 'resend_order',
    },
    {
      title: 'Edit link',
      id: 6,
      defActionName: 'edit',
    },
    {
      title: 'Set start count',
      id: 7,
      defActionName: 'set_start_count',
    },
    {
      title: 'Set partial',
      id: 8,
      defActionName: 'set_partial',
    },
    {
      title: 'Set remains',
      id: 9,
      defActionName: 'set_remains',
    },
    {
      title: 'Change status',
      id: 10,
      defActionName: 'change_status',
    },
    {
      title: 'Cancel and refund',
      id: 11,
      defActionName: 'cancel_and_refund',
    },
  ];

  const formatAccessMassActions = defaulMassActions?.filter((item) => Object.keys(access)
    .filter((item) => access[item])
    .includes(item.defActionName));

  if (access.change_status.length === 0) {
    return formatAccessMassActions.filter((item) => item.defActionName !== 'change_status');
  }

  return formatAccessMassActions;
};

export const itemDropStatuses = (statuses, itemAccess = []) => statuses.filter((item) => itemAccess.includes(item.id)).map((elem) => ({ id: elem.id, title: elem.title }));

export const onSubmitConfirValue = (values) => {
  const { key, title, id } = values;

  switch (title.trim()) {
    case 'Change status':
      return changeOrderStatusAction(id, key);

    case 'Cancel and refund':
      return cancelOrderAction(id);

    default:
      break;
  }
};

export const settingModalHelperDetails = (id) => [
  {
    title: 'Order details',
  },
  {
    title: 'Error details',
  },
  {
    title: 'Details for superadmin',
  },
  {
    id,
    title: 'Fail details',
    resendOrder: true,
    submitAction: resendOrderAction,
    submitBtnText: 'Resend order',
  },
];

export const detectSelectedTitle = (
  key,
  title,
  item,
  dispatch,
  setConfirmValues,
  setModalSettings,
  toggle,
  toggleDetails,
  toggleConfirm,
) => {
  const confirmTitles = ['Change status', 'Cancel and refund'];
  const editTitles = ['Edit link', 'Set start count', 'Set partial', 'Set remains'];
  const detailsTitles = ['Error details', 'Fail details', 'Order details', 'Details for superadmin'];

  if (confirmTitles.includes(title)) {
    setConfirmValues({
      key,
      title,
      id: item.id,
    });
    toggleConfirm();
  } else if (editTitles.includes(title)) {
    setModalSettings(settingModalHelper(item.link, item.id, item.count).filter((item) => item.title === title)[0]);
    toggle();
  } else if (detailsTitles.includes(title)) {
    setModalSettings(settingModalHelperDetails(item.id).filter((item) => item.title === title)[0]);
    dispatch(getOrderSendInfoAction(25108562)); // change later
    toggleDetails();
  }
};
