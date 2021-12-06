import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { generateStatuses } from './helpers';

const DropdownSubMenu = ({
  element,
  dropdownOpen,
  onMouseEnter,
  onMouseLeave,
  toggle,
  handleSelect,
  forAssign,
  submenuStatuses,
  submenuPlacement,
}) => {
  const staff = useSelector((state) => state.tickets.data.staff);
  const parsedStaff = staff?.filter((el) => el.id !== 0);

  return (
    <li className="dropdown-submenu">
      <ButtonToolbar className={`dropdown-submenu-${submenuPlacement}`}>
        <DropdownButton
          open={dropdownOpen}
          onToggle={toggle}
          onSelect={(key) => handleSelect(key, element.title)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          title={element.title}
          id="dropdown-submenu-btn"
        >
          {forAssign
            ? parsedStaff?.map((item) => (
              <MenuItem key={item.id} eventKey={item.id}>
                {item.title}
              </MenuItem>
            ))
            : generateStatuses(submenuStatuses).map((item, index) => (
              <MenuItem key={index} eventKey={item.id ?? index + 1}>
                {item.title ?? item}
              </MenuItem>
            ))}
        </DropdownButton>
      </ButtonToolbar>
    </li>
  );
};

DropdownSubMenu.propTypes = {
  element: PropTypes.object,
  dropdownOpen: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  toggle: PropTypes.func,
  handleSelect: PropTypes.func,
  forAssign: PropTypes.bool,
  submenuStatuses: PropTypes.array,
  submenuPlacement: PropTypes.string,
};

DropdownSubMenu.defaultProps = {
  submenuPlacement: 'right',
};

export default DropdownSubMenu;
