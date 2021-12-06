import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import { useLocation, useHistory } from 'react-router-dom';
import Dropdown from '../../Dropdown/Default';
import { doRequest } from './helpers';

const AssignFilter = ({
  size,
  title,
  items,
  forAssign,
}) => {
  const location = useLocation();
  const history = useHistory();

  const searchArr = qs.parse(location.search.substring(1));

  const doRequestFunc = (key) => doRequest(key, searchArr, location, history);

  return (
    <Dropdown
      size={size}
      title={title}
      items={items}
      handleSelect={doRequestFunc}
      classForBtnDrop="customFilterDropdownButton assignFilter"
      forAssign={forAssign}
    />
  )
}

AssignFilter.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array,
  forAssign: PropTypes.bool,
}

AssignFilter.defaultProps = {
  title: 'default',
  items: [],
};

export default AssignFilter;
