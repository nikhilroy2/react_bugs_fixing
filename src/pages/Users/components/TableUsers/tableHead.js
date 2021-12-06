/* import/no-extraneous-dependencies: off */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import qs from 'qs';

import { useSelector } from 'react-redux';
import Filter from '../../../../components/Filters/StatusFilter';
import TableCheckAll from './tableCheckAll';

const TableHead = ({
  item, handleSelect, values, access, onChangeCheck, accessMassActions, statuses,
}) => {
  const history = useHistory();
  const location = useLocation();
  const queryString = qs.parse(location.search.slice(1));
  const config = useSelector((state) => state.users.config);

  const massAvailable = () => config.access?.mass_reset_rates || config.access?.mass_copy_rates || config.access?.mass_change_status;

  const availableItemAction = () => !config.access?.copy_custom_rates
        && !config.access?.change_status
        && !config.access?.get_custom_rates
        && !config.access?.get_user
        && !config.access?.update_user;

  const sendSortValue = (e, item) => {
    e.preventDefault();

    if (item.active === 'desc') {
      delete queryString.page;
      queryString.sort = item.asc;
    }

    if (item.active === 'asc' || !item.active) {
      delete queryString.page;
      queryString.sort = item.desc;
    }

    return history.push(`${location.pathname}?${(location.search = qs.stringify(queryString))}`);
  };

  switch (item.title) {
    case 'All': {
      if (massAvailable()) {
        return (
          <TableCheckAll
            handleSelect={handleSelect}
            values={values}
            access={access}
            onChangeCheck={onChangeCheck}
            accessMassActions={accessMassActions}
          />
        );
      }
      return null;
    }

    case 'Skype': {
      if (config.fields?.skype) {
        return <th>{item.title}</th>;
      }
      return null;
    }
    case 'Status': {
      return (
        <th className="users__status">
          <Filter title={item.title} items={statuses} queryRequest="status" />
        </th>
      );
    }
    case 'Rates': {
      if (config?.access?.users_custom_rates) {
        return (
          <th className={item.title === 'ID' ? 'p-l' : ''}>
            <a href="# " onClick={(e) => sendSortValue(e, item)}>
              {item?.title}
              {' '}
              {item?.active === 'desc' ? <FontAwesomeIcon icon={faSortDown} /> : ''}
              {item?.active === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : ''}
              {item?.active !== 'asc' && item?.active !== 'desc' ? <FontAwesomeIcon icon={faSort} /> : ''}
            </a>
          </th>
        );
      }
      return null;
    }
    case '': {
      if (availableItemAction()) {
        return null;
      }
      return <th>{item.title}</th>;
    }
    default: {
      break;
    }
  }

  if (item.name) {
    return (
      <th className={item.title === 'ID' ? 'p-l' : ''}>
        <a href="# " onClick={(e) => sendSortValue(e, item)}>
          {item?.title}
          {' '}
          {item?.active === 'desc' ? <FontAwesomeIcon icon={faSortDown} /> : ''}
          {item?.active === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : ''}
          {item?.active !== 'asc' && item?.active !== 'desc' ? <FontAwesomeIcon icon={faSort} /> : ''}
        </a>
      </th>
    );
  }

  return <th>{item.title}</th>;
};

TableHead.propTypes = {
  item: PropTypes.object,
  handleSelect: PropTypes.func,
  values: PropTypes.array,
  access: PropTypes.object,
  onChangeCheck: PropTypes.func,
  accessMassActions: PropTypes.array,
  statuses: PropTypes.array,
};

export default TableHead;
