import DatepickerRange from '../../../../../components/DatePicker/Range';
import Select from '../../../../../components/Select/Custom';
import Dropdown from '../../../../../components/Dropdown/Default';
import RequestSearchSelect from '../../../../../components/Select/RequestSearchSelect';
import SearchSelect from '../../../../../components/Select/SearchSelect';

export const getFields = (statuses, modes, format, users, endDate, startDate, getUsersList) => {
  const elements = [
    {
      labelName: 'Date',
      name: 'date',
      id: 'exportDatepickerFrom',
      component: DatepickerRange,
      defStartDate: startDate,
      defEndDate: endDate,
    },
    {
      labelName: 'Users',
      name: 'users',
      title: 'Users',
      id: 'users-search',
      onRequestFunc: getUsersList,
      component: RequestSearchSelect,
      data: users,
    },
    {
      labelName: 'Services',
      name: 'services',
      toggleBtnTitle: 'Services',
      component: SearchSelect,
    },
    {
      labelName: 'Status',
      name: 'status',
      title: 'Statuses',
      toolbarClassStr: 'exportEmptyDropdown',
      id: 'status-dropdown',
      allSelected: true,
      component: Select,
      data: statuses,
    },
    {
      labelName: 'Providers',
      name: 'providers',
      toggleBtnTitle: 'Providers',
      component: SearchSelect,
    },
    {
      labelName: 'Modes',
      name: 'modes',
      id: 'exportModesDropdown',
      simple: true,
      component: Dropdown,
      data: modes,
      buttonId: 'modes-button',
    },
    {
      labelName: 'Format',
      name: 'format',
      id: 'exportFormatDropdown',
      simple: true,
      component: Dropdown,
      data: format,
      buttonId: 'format-button',
    },
  ];

  return elements;
};
