export const accessFieldsColums = (fields = {}, columns = []) => columns.filter((col) => fields.hasOwnProperty(col.id) && fields[col.id]);

export const modes = [
  {
    id: 'all',
    title: 'All',
  },
  {
    id: 'manual',
    title: 'Manual',
  },
  {
    id: 'auto',
    title: 'Auto',
  },
];

export const format = [
  {
    id: 'xml',
    title: 'XML',
  },
  {
    id: 'json',
    title: 'JSON',
  },
  {
    id: 'csv',
    title: 'CSV',
  },
];

export const statuses = [
  {
    id: 0,
    title: 'Pending',
  },
  {
    id: 1,
    title: 'In progress',
  },
  {
    id: 2,
    title: 'Completed',
  },
  {
    id: 3,
    title: 'Partial',
  },
  {
    id: 4,
    title: 'Canceled',
  },
  {
    id: 5,
    title: 'Processing',
  },
  {
    id: 6,
    title: 'Fail',
  },
  {
    id: 7,
    title: 'Error',
  },
];

export const users = [
  {
    id: 0,
    title: 's2a1dpun237i',
  },
  {
    id: 1,
    title: 'par1m23h',
  },
  {
    id: 2,
    title: '2332e1s1t',
  },
  {
    id: 3,
    title: 'user23',
  },
  {
    id: 4,
    title: 'testAfterMerge.completed123',
  },
  {
    id: 5,
    title: 'Privet123',
  },
  {
    id: 6,
    title: 'rename123',
  },
  {
    id: 7,
    title: 'user123',
  },
];
