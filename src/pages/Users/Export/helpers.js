export const getFields = (from, to) => {
  const elements = [
    {
      label: 'From',
      name: 'from_date',
      id: 'exportDatepickerFrom',
      defaultDate: '2018-05-28',
    },
    {
      label: 'To',
      name: 'to_date',
      id: 'exportDatepickerTo',
      defaultDate: new Date().toISOString().substr(0, 10),
    },
    {
      label: 'Status',
      name: 'include_statuses',
      title: 'Statuses',
      id: 'exportStatusesDropdown',
      allSelected: true,
      toolbarClass: 'exportEmptyDropdown',
    },
    {
      label: 'Format',
      name: 'format',
      id: 'exportFormatsDropdown',
      simple: true,
    },
    {
      isButton: true,
    },
  ];

  if (from || to) {
    return elements.slice(from, to);
  }
  return elements;
};

export const generateTableHead = (accessExport) => {
  if (!accessExport) {
    return ['From', 'To', 'Status', 'Format'];
  }

  return ['From', 'To', 'Status', 'Format', ''];
};

export const makeTableRow = (item) => {
  const tableRow = [item.from_date, item.to_date, item.status, item.format, item.id];

  return tableRow;
};

export const parseValues = (values, statuses, include) => {
  const parsedStatuses = statuses
    .filter((el) => values.include_statuses.includes(el.title))
    .map((el) => +el.id);

  return {
    ...values,
    format: values.format.toLowerCase(),
    include_statuses: parsedStatuses,
    include_columns: include?.map((item) => item.id),
  };
};

export const validExportColumns = (export_columns = [], fields = {}) => {
  if (!fields?.skype && !fields?.name) {
    return export_columns
            ?.filter((item) => item.id !== 'skype')
            .filter((el) => el.id !== 'last_name' && el.id !== 'first_name');
  } if (!fields?.skype) {
    return export_columns?.filter((item) => item.id !== 'skype');
  } if (!fields?.name) {
    return export_columns?.filter((el) => el.id !== 'last_name' && el.id !== 'first_name');
  }

  return export_columns;
};
