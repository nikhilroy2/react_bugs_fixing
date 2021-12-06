export const generateTableHead = () => [
  'All',
  'ID',
  'User',
  'Order ID',
  'Start count',
  'Quantity',
  'Current count',
  'To refill',
  'Service',
  'Status',
  'Created',
  'Mode',
  '',
];

export const makeTableRow = (item) => [
  { value: '', type: 'checkbox' },
  { value: item.id, type: 'id' },
  { value: item.username, type: 'username' },
  { value: item.order_id, type: 'order_id' },
  { value: item.start_count, type: 'start_count', tooltipText: item.tooltipText },
  { value: item.quantity, type: 'quantity' },
  { value: item.current_count, type: 'current_count', tooltipText: item.tooltipText },
  { value: String(item.current_count).trim() !== '' && item.current_count !== null && Number(item.current_count) >= 0
    ? Number(item.start_count) + Number(item.quantity) - Number(item.current_count)
    : null,
  type: 'to_refill' },
  { value: item.service, type: 'service' },
  { value: item.status_name, type: 'status_name' },
  { value: item.created, type: 'created' },
  { value: item.mode_name, type: 'mode_name' },
  { value: '', type: 'actions' },
];

export const generateAccessMassDrop = (access = {}, t, query) => {
  const defaulMassActions = [
    access?.bulk_status
      && Number(query?.status) !== 5 && {
      title: t('ActionsList.Change status'),
      id: 1,
    },
    query?.hasOwnProperty('status')
      && Number(query?.status) === 5
      && access?.bulk_resend && {
      title: t('ActionsList.Resend'),
      id: 2,
    },
  ];

  return defaulMassActions.filter((item) => !!item);
};

export const generateAccessItemDrop = (access = {}, fullAccess = {}, t) => {
  if (fullAccess?.details && access?.details) {
    access.details = true;
  }

  const defaultAccess = [
    {
      title: t('ActionsList.Details'),
      id: 1,
      defActionName: 'view',
    },
    {
      title: t('ActionsList.Change status'),
      id: 2,
      defActionName: 'change_status',
    },
    {
      title: t('ActionsList.Resend'),
      id: 3,
      defActionName: 'resend',
    },
    {
      title: t('ActionsList.Details for superadmin'),
      id: 5,
      defActionName: 'details',
    },
  ];

  const formatAccessMassActions = defaultAccess?.filter((item) => Object.keys(access)
    .filter((item) => access[item])
    .includes(item.defActionName));

  return formatAccessMassActions;
};

export const isValidURL = (string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?'
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
      + '((\\d{1,3}\\.){3}\\d{1,3}))'
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
      + '(\\?[;&a-z\\d%_.~+=-]*)?'
      + '(\\#[-a-z\\d_]*)?$',
    'i',
  );

  const validUrl = !!pattern.test(string);

  if (validUrl === false) {
    return false;
  }

  try {
    new window.URL(string);
  } catch (_) {
    return false;
  }

  return true;
};

export const checkTableCount = (count, tooltipText) => {
  if (Number(count) === -1) {
    return { value: '', tooltip: !!tooltipText, tooltipText: tooltipText || 'Getting start count', icon: 'far fa-clock' };
  }

  if (Number(count) === -2) {
    return { value: '', tooltip: !!tooltipText, tooltipText: tooltipText || 'Failed to get the start count', icon: 'far fa-times-circle' };
  }

  if (Number(count) === -3) {
    return { value: '', tooltip: !!tooltipText, tooltipText: tooltipText || 'Not enough parsing credits', icon: 'far fa-minus-circle' };
  }

  return { value: count, tooltip: false };
};
