import _ from 'lodash';

export const getFormGroupsArray = (mode, fields) => {
  const formGroupsArray = [
    {
      label: 'Username',
      key: 'usersUsername',
      focus: true,
      needRef: mode,
    },
    {
      label: 'Email',
      key: 'usersEmail',
    },
    fields.skype && {
      label: 'Skype',
      key: 'usersSkype',
    },
    fields.name && {
      label: 'First name',
      key: 'usersFirst_name',
    },
    fields.name && {
      label: 'Last name',
      key: 'usersLast_name',
    },
    fields.hasOwnProperty('cpf')
      && fields.cpf && {
      label: 'CPF',
      key: 'cpf_value',
    },
  ];

  const password = {
    label: 'Password',
    key: 'usersPassword',
    tooltipText: 'Generate<br /> password',
    generate: true,
  };

  const payments = {
    label: 'Allowed payment methods',
    key: 'usersPayment_methods',
    payment: true,
  };

  return [...formGroupsArray, !mode && password, payments];
};

export const checkIsChecked = (item, values) => {
  const index = _.findIndex(values.usersParsedMethods, (el) => el.id === item.id);
  if (values.usersParsedMethods.length) return values.usersParsedMethods[index].checked;
};

export const handleChangeChechboxes = (item, values, setFieldValue) => {
  const checkedPayments = values.usersParsedMethods;
  const checkedItems = checkedPayments.map((elem) => {
    if (elem.id === item.id) {
      elem.checked = !elem.checked;
    }

    return elem;
  });

  setFieldValue('usersParsedMethods', checkedItems);
};

export const parseValues = (values) => ({
  username: values.usersUsername,
  email: values.usersEmail,
  skype: values.usersSkype,
  first_name: values.usersFirst_name,
  last_name: values.usersLast_name,
  cpf: values.cpf_value,
  payment_methods: values.usersParsedMethods.filter((el) => el.checked).map((el) => el.id),
  password: values.usersPassword,
});

export const emptyValues = {
  usersUsername: '',
  usersEmail: '',
  usersSkype: '',
  usersFirst_name: '',
  usersLast_name: '',
  cpf_value: '',
  usersPassword: '',
  usersPayment_methods: [],
};
