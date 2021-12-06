/* no-return-assign: off */
export const countDecimals = (number) => {
  if (Math.floor(number) === number) return 0;
  return number?.toString().split('.')[1] ? number?.toString().split('.')[1].length : 0;
};

export const countInteger = (number) => (number?.toString().split('.')[0] ? number?.toString().split('.')[0].length : 0);

export const parseServiceList = (services, config) => {
  const categoryName = [...new Set(services?.map((item) => item.category_name))];

  const servicesWithTitle = services?.map((item) => ({
    ...item,
    title: item.service_name,
    service_id: item.id,
    price: Number(item.price).toFixed(2),
    custom_price: Number(item.price).toFixed(2),
    custom_percent: '100',
    percent: '0',
    provider_rate_origin:
      item?.provider_rate_origin !== null ? Number(item?.provider_rate_origin).toFixed(2) : item?.provider_rate_origin,
    provider_rate:
      item?.provider_rate !== null
        ? Number(item?.provider_rate).toFixed(countDecimals(Number(config?.min_service_rate)))
        : item?.provider_rate,
  }));

  const selectObjServices = {};

  categoryName.map((item) => (selectObjServices[item] = servicesWithTitle?.filter((el) => el.category_name === item)));

  return selectObjServices;
};

export const findRatesInServices = (userRates, services, config) => userRates?.map((item) => {
  const findEl = services?.find((el) => el.id === Number(item.service_id));

  return {
    ...item,
    ...findEl,
    provider_rate_origin:
        findEl?.provider_rate_origin !== null
          ? Number(findEl?.provider_rate_origin).toFixed(2)
          : findEl?.provider_rate_origin,
    provider_rate:
        findEl?.provider_rate !== null
          ? Number(findEl?.provider_rate).toFixed(countDecimals(Number(config?.min_service_rate)))
          : findEl?.provider_rate,
    custom_price: item.percent === '0' ? item.price : Number(findEl?.price).toFixed(2) || '0',
    custom_percent: item.percent === '0' ? '100' : parseInt(item.price, 10).toString(),
    custom_id: item.id,
  };
});

export const filterRates = (ratesValues, searchValue) => ratesValues?.filter((item) => (item.service_name + item.service_id)
  .replace(/\s/g, '')
  .toLowerCase()
  .includes(searchValue.replace(/\s/g, '').toLowerCase())
  );

export const submitFormatValue = (values) => values.custom_rates.map((item) => ({
  service_id: item.service_id,
  price: item.percent === '0' ? item.custom_price : item.custom_percent,
  percent: item.percent,
  rate_id: item.custom_id,
}));

export const detectConvertedRate = (converted, provider_rate, provider_rate_origin) => {
  const diff = (a, b) => (a > b ? a - b : b - a);

  if (converted || diff(provider_rate, provider_rate_origin)) {
    return 'converted';
  } if (!converted && provider_rate !== null) {
    return 'not-converted';
  }
  return false;
};

export const onChangeRatesValue = (e, setFieldValue, index, percent) => {
  const { value } = e.target;

  switch (percent) {
    case '0':
      if (/^\d{0,17}\.?\d{0,3}$/.test(value)) {
        if (value[0] === '0' && value[1] !== '.' && value.length > 1) {
          return setFieldValue(`custom_rates.${index}.custom_price`, value.substr(1));
        }

        if (value === '' || countInteger(value) === 0) {
          setFieldValue(`custom_rates.${index}.custom_price`, value);
        } else {
          setFieldValue(`custom_rates.${index}.custom_price`, value);
        }
      }
      break;

    case '1':
      if (/^\d{0,8}$/.test(value)) {
        if (value[0] === '0' && value.length > 1) {
          return setFieldValue(`custom_rates.${index}.custom_percent`, value.substr(1));
        }

        if (value === '' || countInteger(value) === 0) {
          setFieldValue(`custom_rates.${index}.custom_percent`, value);
        } else {
          setFieldValue(`custom_rates.${index}.custom_percent`, value);
        }
      }
      break;

    default:
      break;
  }
};

export const onBlurValidateRate = (e, setFieldValue, index, percent) => {
  const { value } = e.target;

  if (percent === '1') {
    if (!value) {
      const validPercent = '0';
      return setFieldValue(`custom_rates.${index}.custom_percent`, validPercent);
    }
  }

  if (percent === '0') {
    if (!value) {
      const validPrice = '0.00';
      return setFieldValue(`custom_rates.${index}.custom_price`, validPrice);
    }

    if (value[0] === '.') {
      const validPrice = `0${value}`;
      return setFieldValue(`custom_rates.${index}.custom_price`, validPrice);
    }

    if (countDecimals(value) === 0) {
      if (value[value.length - 1] === '.') {
        setFieldValue(`custom_rates.${index}.custom_price`, `${value}00`);
      } else {
        if (countInteger(value) > 17) {
          setFieldValue(`custom_rates.${index}.custom_price`, `${value.slice(0, 17)}.00`);
        } else {
          setFieldValue(`custom_rates.${index}.custom_price`, `${value}.00`);
        }
      }
    }

    if (countDecimals(value) === 1) {
      setFieldValue(`custom_rates.${index}.custom_price`, `${value}0`);
    }

    if (countDecimals(value) === 3 && value[value.length - 1] === '0') {
      setFieldValue(`custom_rates.${index}.custom_price`, value.slice(0, -1));
    }
  }
};
