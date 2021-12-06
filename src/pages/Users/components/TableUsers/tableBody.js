import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import TableCheckbox from './tableCheckbox';
import Dropdown from '../../../../components/Dropdown/Default';
import Tooltip from '../../../../components/Tooltip';

import { getUserAccess } from '../../helpers';
import { getCustomRatesForUserAction } from '../../../../redux/actions/users/actions';

const TableBody = ({
  item, elem, index, handleSelect, onChangeCheck, values, openModal,
}) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.users.config);
  const massAvailable = () => config.access?.mass_change_status || config.access?.mass_copy_rates || config.access?.mass_reset_rates;

  switch (elem) {
    case 'actions': {
      if (getUserAccess(item).length > 0) {
        return (
          <td className="td-caret">
            <Dropdown
              handleSelect={handleSelect}
              size="xsmall"
              title="Actions"
              items={getUserAccess(item, config?.access)}
              forMassActions
              classForBtnDrop="fontWieghtMed"
              dropStyle="default"
              toolbarClass="dropdown-right"
              openModal={openModal}
              user={item}
              id={item.id}
              item={item}
            />
          </td>
        );
      }
      return null;
    }

    case 'rates': {
      if (config?.access?.users_custom_rates) {
        return (
          <td>
            <Button
              bsSize="xsmall"
              className={`${item.custom_rates === 0 ? 'users-table__rates-btn' : ''} ${
                item.is_inactive ? 'users-table__btnSuspended' : ''
              }`}
              onClick={() => {
                dispatch(getCustomRatesForUserAction(item.id));
                openModal(5, item);
              }}
            >
              Custom rates
              {' '}
              {item.custom_rates > 0 && <Badge>{item.custom_rates}</Badge>}
            </Button>
          </td>
        );
      }
      return null;
    }

    case 'checkbox': {
      if (massAvailable()) {
        return <TableCheckbox item={item} index={index} values={values} onChangeCheck={onChangeCheck} />;
      }
      return null;
    }

    case 'email': {
      return (
        <td>
          <span>{item.email}</span>
          {' '}
          {item.is_confirmed && (
          <Tooltip placement="top" tooltipClass="tooltip__top" text={item.is_confirmed_title}>
            <span className="fa fa-check-circle" />
          </Tooltip>
          )}
        </td>
      );
    }

    default: {
      break;
    }
  }

  if (index === 4) {
    if (config.fields?.skype) {
      return <td className="users__skype">{elem}</td>;
    }
  }

  return <td className={index === 1 ? 'p-l' : ''}>{elem}</td>;
};

TableBody.propTypes = {
  item: PropTypes.object,
  elem: PropTypes.string,
  index: PropTypes.number,
  handleSelect: PropTypes.func,
  onChangeCheck: PropTypes.func,
  values: PropTypes.array,
  openModal: PropTypes.func,
};

export default TableBody;
