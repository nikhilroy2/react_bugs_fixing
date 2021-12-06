import './_searchFilter.scss';
import React, {
  useState, useEffect, useRef, createRef,
} from 'react';
import { Dropdown, MenuItem, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SearchMenu from './components/searchMenu';
import SearchToggle from './components/searchToggle';
import SearchItem from './components/searchItem';

import { createdArraysForSelect, onKeyPressHandler } from './helpers';

const SearchFilter = ({
  headerSelectText,
  options,
  toggleBtnTitle,
  onSelectedValues,
  forCustomRates,
  onSelectRates,
  closeOnEnter,
  className,
  label,
  selectedOptions,
}) => {
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const optionsTitles = Object.keys(options);

  const [inputValue, setInputValue] = useState('');
  const [activeItemPosition, setActiveItemPosition] = useState(-1);
  const [activeValue, setActiveValue] = useState({});
  const [values, setValues] = useState(
    _.flatten(optionsTitles?.map((title) => options[title]?.map((item) => item.id))) || [],
  );
  const [open, setOpen] = useState();
  const onToggleClose = () => setOpen(!open);

  const { filteredOptions, unionFilteredOptions, forActiveValue } = createdArraysForSelect(
    optionsTitles,
    options,
    inputValue,
  );

  const onSelectValue = (key) => {
    if (values.includes(key)) {
      setValues(values.filter((item) => item !== key));
    } else {
      setValues([...values, key]);
    }
  };

  const handleFocus = () => inputRef?.current?.focus();

  const refs = unionFilteredOptions.reduce((acc, value) => {
    acc[value.id] = createRef();
    return acc;
  }, {});

  const focusOnActiveItem = (id) => refs[id]?.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });

  const onKeyDownHandler = (event) => onKeyPressHandler(
    event,
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
  );

  useEffect(() => {
    if (inputValue !== '') {
      setActiveItemPosition(0);
      setActiveValue(forActiveValue[0]);
    } else {
      setActiveItemPosition(-1);
      setActiveValue({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    focusOnActiveItem(activeValue?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeValue]);

  useEffect(() => {
    if (open) {
      return inputRef?.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  onSelectedValues && onSelectedValues(values);

  return (
    <>
      {label && <ControlLabel>{label}</ControlLabel>}
      <Dropdown
        onKeyDown={onKeyDownHandler}
        onToggle={onToggleClose}
        id="dropdown"
        open={open}
        rootCloseEvent="click"
        onFocus={() => handleFocus()}
        className={className}
      >
        <SearchToggle forCustomRates={forCustomRates} bsRole="toggle">
          {toggleBtnTitle}
          {' '}
          <span className="options-count">{!forCustomRates ? `(${values.length})` : ''}</span>
        </SearchToggle>

        <SearchMenu
          style={{ color: 'red' }}
          bsRole="menu"
          inputRef={inputRef}
          listRef={listRef}
          setValues={setValues}
          filteredOptions={unionFilteredOptions}
          setInputValue={setInputValue}
          inputValue={inputValue}
          values={values}
          handleFocus={handleFocus}
          forCustomRates={forCustomRates}
          onToggleClose={onToggleClose}
          activeValue={activeValue}
        >
          {forCustomRates && inputValue === '' && (
            <>
              <li
                className={
                  !_.isEmpty(activeValue)
                    ? 'dropdown-header-select not-empty'
                    : 'dropdown-header-select'
                }
              >
                <a href="# " onClick={(e) => e.preventDefault()}>
                  {headerSelectText}
                </a>
              </li>
              {!_.isEmpty(options) && <MenuItem divider />}
            </>
          )}
          {optionsTitles?.map((item, index) => (
            <SearchItem
              key={index}
              title={item}
              index={index}
              filteredOptions={filteredOptions}
              optionsTitles={optionsTitles}
              refs={refs}
              onSelectValue={onSelectValue}
              onSelectRates={onSelectRates}
              values={values}
              activeValue={activeValue}
              setActiveValue={setActiveValue}
              setActiveItemPosition={setActiveItemPosition}
              forActiveValue={forActiveValue}
              forCustomRates={forCustomRates}
              selectedOptions={selectedOptions}
            />
          ))}
          {unionFilteredOptions.length === 0 && !_.isEmpty(options) && (
            <li className="menu-item-no_result">
              <a href="# " onClick={(e) => e.preventDefault()}>
                No results matched
                {' '}
                {inputValue && `"${inputValue}"`}
              </a>
            </li>
          )}
        </SearchMenu>
      </Dropdown>
    </>
  );
};

SearchFilter.propTypes = {
  options: PropTypes.object,
  onSelectedValues: PropTypes.func,
  toggleBtnTitle: PropTypes.string,
  forCustomRates: PropTypes.bool,
  onSelectRates: PropTypes.func,
  closeOnEnter: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  selectedOptions: PropTypes.array,
  headerSelectText: PropTypes.string,
};

SearchFilter.defaultProps = {
  options: {},
  toggleBtnTitle: 'Options',
  headerSelectText: 'Select service',
};

export default SearchFilter;
