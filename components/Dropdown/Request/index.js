import '../Default/_filter.scss';
import '../Default/_filter.dark-mode.scss';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import qs from 'qs';

import { getActiveStatus, doRequest } from './helpers';

const Dropdown = ({
  size,
  title,
  dropStyle,
  toolbarClass,
  disabled,
  onRequestFunc,
  items,
  queryRequest,
  withServicesId,
  clearData,
  withAll,
}) => {
  const history = useHistory();
  const location = useLocation();

  const queryString = qs.parse(location.search.slice(1));

  const doRequestFunc = (key) => doRequest(key, queryString, queryRequest, location, history, withAll);

  useEffect(() => {
    clearData && clearData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ButtonToolbar className={toolbarClass}>
      <DropdownButton
        bsSize={size}
        title={title}
        bsStyle={dropStyle}
        id={`dropdown-size-${size || 'medium'}`}
        className={`customFilterDropdownButton request__button ${withServicesId ? ' request__button-service' : ''}`}
        disabled={disabled}
        onClick={() => items?.length <= 0 && onRequestFunc()}
      >
        {items?.length <= 0 ? (
          <li className="loader__li">
            <div className="small-loader" />
          </li>
        ) : (
          items?.map((el, i) => (
            <MenuItem
              key={i}
              className={
                  String(getActiveStatus(queryString, queryRequest, withAll)) === String(el.id) && el.active === false
                    ? 'customActiveDropdownItem not-active-service'
                    : String(getActiveStatus(queryString, queryRequest, withAll)) === String(el.id)
                      ? 'customActiveDropdownItem'
                      : el.active === false
                        ? 'not-active-service'
                        : ''
                }
              eventKey={el.id}
              active={String(getActiveStatus(queryString, queryRequest, withAll)) === String(el.id)}
              onSelect={(key) => {
                doRequestFunc(key, el.title);
              }}
            >
              {withServicesId && el.id !== null && <span className="item-id">{el.id}</span>}
              {el.title}
            </MenuItem>
          ))
        )}
      </DropdownButton>
    </ButtonToolbar>
  );
};

Dropdown.propTypes = {
  size: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  dropStyle: PropTypes.string,
  toolbarClass: PropTypes.string,
  disabled: PropTypes.bool,
  items: PropTypes.array,
  onRequestFunc: PropTypes.func,
  queryRequest: PropTypes.string,
  withServicesId: PropTypes.bool,
  clearData: PropTypes.func,
  withAll: PropTypes.bool,
};

Dropdown.defaultProps = {
  title: 'default',
  dropStyle: 'default',
  items: [],
  withAll: false,
};

export default Dropdown;
