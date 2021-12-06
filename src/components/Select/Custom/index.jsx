/* eslint-disable react-hooks/exhaustive-deps */
import './_select.scss';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, Glyphicon, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

import { changeTitle, handleClick, handleKeyPress, handleClickOutside } from './helpers';

const SelectComponent = ({ setOutsideValue, setFieldValue, fieldName, options, narrow, title, id, allSelected, toolbarClass }) => {
  const ref = useRef(id);

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  const keyHandler = (e) => handleKeyPress(e, setOpen);
  const clickHandler = (e) => handleClickOutside(e, setOpen, ref);

  const [selected, setSelected] = useState(allSelected ? options.map((el) => el.title) : []);
  const [activeTitle, setTitle] = useState(`${title} (${selected.length})`);

  useEffect(() => {
    if (!options.length) options.push({ title: 'No options', emptySelect: true });
  }, []);

  useLayoutEffect(() => {
    changeTitle(selected, options, setTitle, title);
    if (setOutsideValue) setOutsideValue(selected);
    if (setFieldValue && fieldName) setFieldValue(fieldName, selected);
  }, [selected]);

  useEffect(() => {
    if (open) {
      document.addEventListener('click', clickHandler);
      document.addEventListener('keydown', keyHandler);
    }
    return () => {
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [open]);

  return (
    <div className="select__wrapper" ref={ref}>
      <DropdownButton
        className={`${toolbarClass} select__button
                        ${open ? 'select__opened' : ''}
                        ${narrow ? '' : 'select__wideButton'}
                        ${selected.length ? '' : 'select__empty'}`}
        title={activeTitle}
        onToggle={() => {}}
        onClick={toggle}
        open={open}
        id={id}
      >
        {options.map((item, index) => (
          <MenuItem onClick={() => handleClick(selected, item, setSelected)} className="select__menuItem" key={index}>
            {item.title}

            {_.findIndex(selected, (elem) => elem === item.title) !== -1 ? <Glyphicon className="select__selectedGlyph" glyph="ok" /> : null}
          </MenuItem>
        ))}
      </DropdownButton>
    </div>
  );
};

SelectComponent.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setFieldValue: PropTypes.func,
  fieldName: PropTypes.string,
  narrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setOutsideValue: PropTypes.func,
  allSelected: PropTypes.bool,
  toolbarClass: PropTypes.string,
  options: PropTypes.array,
  title: PropTypes.string,
};

SelectComponent.defaultProps = {
  options: [],
  title: 'Options',
};

export default SelectComponent;
