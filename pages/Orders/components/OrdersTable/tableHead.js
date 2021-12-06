import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from '../../../../components/Dropdown/Default';
import DropdownRequest from '../../../../components/Dropdown/Request';
import Filter from '../../../../components/Filters/StatusFilter';
import ConfirmModal from '../../../../components/Modal/Confirm';

import { getServicesListAction } from '../../../../redux/actions/general';
import { bulkUpdateOrdersStatusAction } from '../../../../redux/actions/orders';
import { generateTableHead, usersDrop } from '../../helpers';

const TableHead = ({
  values, setValues, onChangeCheck, config, accessMassActions,
}) => {
  const [isOpenConfirm, setIsOpen] = useState(false);
  const [confirmValues, setConfirmValues] = useState({
    key: null,
    title: '',
  });

  const toggleConfirm = () => setIsOpen(!isOpenConfirm);

  const dispatch = useDispatch();
  const services = useSelector((state) => state.general.services);

  const onRequestServices = async () => {
    try {
      await dispatch(getServicesListAction());
    } catch (error) {
      return [];
    }
  };

  const handleSelectMass = (key, title) => {
    setConfirmValues({
      key,
      title,
    });

    toggleConfirm();
  };

  const onSubmitConfirm = () => {
    switch (confirmValues.title) {
      case 'Change status':
        dispatch(bulkUpdateOrdersStatusAction({ orders: values, status: confirmValues.key }));
        break;

      default:
        break;
    }

    toggleConfirm();
  };

  useEffect(() => {
    setValues([]);
  }, [setValues])

  return (
    <thead>
      <ConfirmModal
        toggle={toggleConfirm}
        isOpen={isOpenConfirm}
        onSubmitConfirm={onSubmitConfirm}
                // fetching={isFetching}
        title="Are you sure?"
      />
      <tr>
        {generateTableHead(config?.fields).map((name, index) => {
          switch (name) {
            case 'All':
              return (
                <th
                  key={index}
                  className={values.length > 0 ? 'check-all check-all__show' : 'check-all'}
                >
                  <div className="check-all__box">
                    <input
                      type="checkbox"
                      value="checkAll"
                      onChange={onChangeCheck}
                      checked={values.length > 0}
                    />
                  </div>
                  <div className="tickets__mass-act">
                    <ul className="mass-act__list">
                      <li>
                        <span>
                          {values.length}
                          {' '}
                          orders selected
                        </span>
                      </li>
                      <li>
                        <Dropdown
                          handleSelect={handleSelectMass}
                          size="xsmall"
                          title="Actions"
                          submenuStatuses={[
                            'Pending',
                            'In progress',
                            'Processing',
                            'Completed',
                          ]}
                          forMassActions
                          classForBtnDrop="fontWieghtMed"
                          dropStyle="default"
                          items={accessMassActions}
                          toolbarClass="dropdown-right"
                        />
                      </li>
                    </ul>
                  </div>
                </th>
              );

            case 'Service':
              return (
                <th key={index} className="tickets__status">
                  <DropdownRequest
                    title={name}
                    items={services}
                    queryRequest="service"
                    withServicesId
                    onRequestFunc={onRequestServices}
                  />
                </th>
              );

            case 'User':
              return (
                <th key={index} className="tickets__status">
                  <Filter title={name} items={usersDrop} queryRequest="api" />
                </th>
              );

            case 'Mode':
              return (
                <th key={index} className="tickets__status">
                  <Filter
                    title={name}
                    items={[{ id: null, title: 'All' }, ...(config.modes ?? [])]}
                    queryRequest="mode"
                  />
                </th>
              );

            case false:
              return null;

            default:
              return <th key={index}>{name}</th>;
          }
        })}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  values: PropTypes.array,
  setValues: PropTypes.func,
  onChangeCheck: PropTypes.func,
  config: PropTypes.object,
  accessMassActions: PropTypes.array,
};

export default TableHead;
