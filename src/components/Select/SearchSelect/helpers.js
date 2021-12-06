import _ from 'lodash';

export const createdArraysForSelect = (optionsTitles, options, inputValue) => {
  const filteredOptions = {
    ...optionsTitles?.map((title) => options[title].filter((item) => (item.title + item.id)
      .replace(/\s/g, '')
      .toLowerCase()
      .includes(inputValue.replace(/\s/g, '').toLowerCase()))
        ),
  };

  const unionFilteredOptions = _.union(...Object.values(filteredOptions));

  const forActiveValue = _.union(...Object.values(filteredOptions))?.map((item, index) => ({
    ...item,
    position: index + 1,
  }));

  return {
    filteredOptions,
    unionFilteredOptions,
    forActiveValue,
  };
};

export const onKeyPressHandler = (
  e,
  activeItemPosition,
  setActiveItemPosition,
  setActiveValue,
  forActiveValue,
  activeValue,
  values,
  setValues,
  forCustomRates,
  onSelectRates,
  onToggleClose,
  closeOnEnter,
) => {
  switch (e.keyCode) {
    case 40:
      activeItemPosition === forActiveValue.length - 1
        ? setActiveItemPosition(0)
        : setActiveItemPosition(activeItemPosition + 1);
      setActiveValue(
        forActiveValue[activeItemPosition === forActiveValue.length - 1 ? 0 : activeItemPosition + 1],
      );
      break;

    case 38:
      activeItemPosition === 0 || activeItemPosition === -1
        ? setActiveItemPosition(forActiveValue.length - 1)
        : setActiveItemPosition(activeItemPosition - 1);
      setActiveValue(
        forActiveValue[
          activeItemPosition === 0 || activeItemPosition === -1
            ? forActiveValue.length - 1
            : activeItemPosition - 1
        ],
      );
      break;

    case 13:
      e.preventDefault();

      if (!closeOnEnter) {
        if (forCustomRates && activeValue && !_.isEmpty(activeValue)) {
          onSelectRates(activeValue)
          onToggleClose()
        }
      } else {
        if (forCustomRates) {
          if (_.isEmpty(activeValue)) {
            return onToggleClose()
          }
          if (activeValue && !_.isEmpty(activeValue)) {
            onSelectRates(activeValue)
            onToggleClose()
          }
        }
      }

      if (!_.isEmpty(activeValue) && values.includes(activeValue?.id)) {
        setValues(values.filter((item) => item !== activeValue?.id));
      } else {
        !_.isEmpty(activeValue) && setValues([...values, activeValue?.id]);
      }
      break;

    default:
      break;
  }
};
