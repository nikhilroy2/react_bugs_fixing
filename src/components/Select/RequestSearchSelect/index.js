/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-autofocus */
import './_requestSelect.scss';
import './_requestSelect.dark-mode.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DropdownButton, Glyphicon, MenuItem, FormGroup,
} from 'react-bootstrap';

import { handleKeyPress, handleClickOutside } from './helpers';
import { useDebounce } from '../../../utils/helper';

const SelectComponent = ({
  onRequestFunc, onChange, options, narrow, title, id, toolbarClass,
}) => {
  const dispatch = useDispatch();

  const ref = useRef();
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  const keyHandler = (e) => handleKeyPress(e, setOpen);
  const clickHandler = (e) => handleClickOutside(e, setOpen, ref);

  const [statusText, setStatusText] = useState('Start typing a search query');

  const [inputValue, setInputValue] = useState('');
  const debounceValue = useDebounce(inputValue, 500);

  const handleKeyDown = (e) => {
    if (e.keyCode === 40 || e.keyCode === 38) {
      e.preventDefault();
    }
  };

  const [stateOptions, setStateOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeTitle, setActiveTitle] = useState(
        selectedOptions?.length > 0 ? `${title} (${selectedOptions?.length})` : `All ${title.toLowerCase()}`,
  );

  useEffect(() => {
    if (debounceValue.length < 2) {
      setStatusText('Please enter more characters');
    } else if (debounceValue && debounceValue.length > 1) {
      setStatusText('Searching...');
      dispatch(onRequestFunc(debounceValue))
        .then((data) => {
          if (data.length === 0) {
            setStatusText('No Results');
          } else {
            setStatusText('');
          }
        })
        .catch(() => {
          setStatusText('Error');
        });
    }
  }, [debounceValue]);

  useEffect(() => {
    setStatusText('Start typing a search query');
    setStateOptions(options);
  }, []);

  useEffect(() => {
    if (selectedOptions.length !== 0) {
      const filteredOptions = options?.filter((opt) => !selectedOptions.map((item) => item.id).includes(opt.id));
      return setStateOptions(filteredOptions);
    }

    setStateOptions(options);
  }, [options]);

  useEffect(() => {
    setActiveTitle(
            selectedOptions?.length > 0 ? `${title} (${selectedOptions?.length})` : `All ${title.toLowerCase()}`,
    );
    onChange && onChange(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    inputRef && inputRef.current.focus();

    if (open) {
      document.addEventListener('click', clickHandler, true);
      document.addEventListener('keydown', keyHandler, true);
    }
    return () => {
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [open]);

  const onChangeInput = (e) => setInputValue(e.target.value);

  const onSelectOptions = (type, item) => {
    switch (type) {
      case 'state':
        setStateOptions(stateOptions.filter((opt) => opt.id !== item.id));
        setSelectedOptions([item, ...selectedOptions]);
        break;

      case 'checked':
        if (options.find((opt) => opt.id === item.id)) {
          setStateOptions([item, ...stateOptions]);
        }

        setSelectedOptions(selectedOptions.filter((opt) => opt.id !== item.id));
        break;

      default:
        break;
    }
  };

  return (
    <div
      className="select__wrapper select__wrapper-request"
      ref={ref}
      onClick={() => inputRef && inputRef.current.focus()}
    >
      <DropdownButton
        className={`${toolbarClass} select__button
                        ${open ? 'select__opened' : ''}
                        ${narrow ? '' : 'select__wideButton'}`}
        title={activeTitle}
        onToggle={() => ({})}
        onClick={() => toggle()}
        open={open}
        id={id}
      >
        <FormGroup className="dropdown-menu__input">
          <input
            className="form-control"
            ref={inputRef}
            autoFocus
            autoComplete="off"
            type="text"
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
            value={inputValue}
            placeholder="Search..."
          />
        </FormGroup>
        {stateOptions.map((item, index) => (
          <MenuItem className="request__menuItem" key={index} onClick={() => onSelectOptions('state', item)}>
            {item.login}
          </MenuItem>
        ))}
        {selectedOptions.length > 0 && stateOptions.length > 0 && <MenuItem divider />}
        {selectedOptions.length > 0 && (
        <li className="select__header">
          <span>Currently Selected</span>
        </li>
        )}
        {selectedOptions.map((item, index) => (
          <MenuItem className="select__menuItem" key={index} onClick={() => onSelectOptions('checked', item)}>
            {item.login}
            <Glyphicon className="select__selectedGlyph" glyph="ok" />
          </MenuItem>
        ))}
        {statusText.length > 0 && <div className="request__status">{statusText}</div>}
      </DropdownButton>
    </div>
  );
};

SelectComponent.propTypes = {
  onRequestFunc: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string,
  narrow: PropTypes.string,
  id: PropTypes.string,
  toolbarClass: PropTypes.string,
};

SelectComponent.defaultProps = {
  options: [],
  title: 'Options',
};

export default SelectComponent;
