import './_filter.scss';
import './_filter.dark-mode.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import qs from 'qs';

import DropdownSubMenu from './dropdownSubMenu';

import { getActiveStatus, getActiveAssign } from './helpers';

const Dropdown = ({
  size,
  title,
  dropStyle,
  classForBtnDrop,
  items,
  forMassActions,
  toolbarClass,
  handleSelect,
  item,
  disabled,
  forAssign,
  disableIndicator,
  submenuStatuses,
  submenuPlacement,
  queryRequest,
  simple,
  buttonId,
}) => {
  const location = useLocation();
  const queryString = qs.parse(location.search.slice(1));

  const [subDropdownsOpen, setDropdownsOpen] = useState([false, false]);

  const toggle1 = () => setDropdownsOpen((prevState) => [!prevState[0], prevState[1]]);
  const onMouseEnter1 = () => setDropdownsOpen((prevState) => [true, prevState[1]]);
  const onMouseLeave1 = () => setDropdownsOpen((prevState) => [false, prevState[1]]);

  const toggle2 = () => setDropdownsOpen((prevState) => [prevState[0], !prevState[1]]);
  const onMouseEnter2 = () => setDropdownsOpen((prevState) => [prevState[0], true]);
  const onMouseLeave2 = () => setDropdownsOpen((prevState) => [prevState[0], false]);

  const onSelect = (key, el) => {
    if (handleSelect) {
      if (item) {
        return handleSelect(key, el.title, item);
      }
      handleSelect(key, el.title);
    }
  };

  return (
    <ButtonToolbar className={toolbarClass}>
      <DropdownButton
        bsSize={size}
        title={title}
        bsStyle={dropStyle}
        id={buttonId ? `${buttonId}` : `dropdown-size-${size || 'medium'}`}
        className={classForBtnDrop}
        disabled={disabled}
      >
        {items?.map((el, i) => {
          if (el.title === 'Change status') {
            return (
              <DropdownSubMenu
                key={`Status${el.id}`}
                handleSelect={handleSelect}
                element={el}
                toggle={toggle1}
                dropdownOpen={subDropdownsOpen[0]}
                onMouseEnter={onMouseEnter1}
                onMouseLeave={onMouseLeave1}
                submenuStatuses={submenuStatuses}
                submenuPlacement={submenuPlacement}
              />
            );
          } if (el.title === 'Assign') {
            return (
              <DropdownSubMenu
                key={`Assign${el.id}`}
                handleSelect={handleSelect}
                element={el}
                toggle={toggle2}
                dropdownOpen={subDropdownsOpen[1]}
                onMouseEnter={onMouseEnter2}
                onMouseLeave={onMouseLeave2}
                forAssign
              />
            );
          }

          return (
            <MenuItem
              key={i}
              className={
                !forMassActions && getActiveStatus(queryString, location.pathname, queryRequest) === el.id
                  ? 'customActiveDropdownItem'
                  : ''
              }
              eventKey={el.id}
              active={
                simple
                  ? title === el.title
                  : forMassActions || disableIndicator
                    ? null
                    : forAssign
                      ? getActiveAssign(queryString, location.pathname) === +el.id
                      : getActiveStatus(queryString, location.pathname, queryRequest) === el.id
              }
              onSelect={(key) => onSelect(key, el)}
            >
              {el.title}
              {el.count >= 0 && ` (${el.count})`}
            </MenuItem>
          );
        })}
      </DropdownButton>
    </ButtonToolbar>
  );
};

Dropdown.propTypes = {
  size: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  dropStyle: PropTypes.string,
  classForBtnDrop: PropTypes.string,
  items: PropTypes.array,
  toolbarClass: PropTypes.string,
  handleSelect: PropTypes.func,
  disabled: PropTypes.bool,
  forAssign: PropTypes.bool,
  disableIndicator: PropTypes.bool,
  submenuStatuses: PropTypes.array,
  submenuPlacement: PropTypes.string,
  queryRequest: PropTypes.string,
  forMassActions: PropTypes.bool,
  item: PropTypes.object,
  simple: PropTypes.bool,
  buttonId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Dropdown.defaultProps = {
  title: 'default',
  dropStyle: 'default',
  classForBtnDrop: 'customFilterDropdownButton',
  items: [],
};

export default Dropdown;
