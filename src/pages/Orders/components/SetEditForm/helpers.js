import { setOrderPartialAction, setOrderRemainsAction, changeOrderLinkAction } from '../../../../redux/actions/orders';

export const settingModalHelper = (link, id, max) => [
  {
    id,
    title: 'Edit link',
    modalText: {
      title: 'Edit link',
      okBtnText: 'Save',
      cancelBtnText: 'Cancel',
    },
    inputLabel: 'Edit link',
    initValue: {
      link: link || '',
    },
    name: 'link',
    type: 'text',
  },
  {
    id,
    title: 'Set start count',
    modalText: {
      title: 'Set start count',
      okBtnText: 'Set start count',
      cancelBtnText: 'Cancel',
    },
    inputLabel: 'Start count',
    initValue: {
      count: '',
    },
    name: 'count',
    type: 'text',
  },
  {
    id,
    title: 'Set partial',
    modalText: {
      title: 'Set partial',
      okBtnText: 'Set partial',
      cancelBtnText: 'Cancel',
    },
    inputLabel: 'Remains',
    initValue: {
      remains: '',
    },
    name: 'partial',
    type: 'text',
  },
  {
    id,
    title: 'Set remains',
    modalText: {
      title: 'Set remains',
      okBtnText: 'Set remains',
      cancelBtnText: 'Cancel',
    },
    inputLabel: 'Remains',
    initValue: {
      remains: '',
    },
    name: 'remains',
    type: 'number',
    max,
  },
];

export const detectActionAndSubmit = ({
  id, initValue, name, title,
}) => {
  switch (title.trim()) {
    case 'Edit link':
      return changeOrderLinkAction(id, initValue.link);

      // case 'Set start count':
      //     return cancelOrderAction(id);

    case 'Set partial':
      return setOrderPartialAction(id, initValue[name]);

    case 'Set remains':
      return setOrderRemainsAction(id, initValue[name]);

    default:
      break;
  }
};
