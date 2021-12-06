import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../../../../components/Filters/StatusFilter';
import FilterAssign from '../../../../components/Filters/AssignFilter';
import TableCheckAll from './tableCheckAll';
import TableView from './tableView';
import TableCheckbox from './tableCheckbox';
import ConfirmModal from '../../../../components/Modal/Confirm';

import { generateTableHead, makeTableRow, submitMassAction } from '../../helpers';

const TableTickets = ({
  tickets, accessMassActions, statuses, toggleView, values, setValues, config, staff,
}) => {
  const dispatch = useDispatch();

  const massFetching = useSelector((state) => state.tickets.massFetching);
  const [isAssignAction, setIsAssign] = useState(false);

  const [isOpenConfirm, setIsOpen] = useState(false);
  const [confirmValues, setConfirmValues] = useState({
    key: null,
    title: '',
  });
  const toggleConfirm = () => {
    if (isOpenConfirm) setIsAssign(false);
    setIsOpen(!isOpenConfirm);
  };

  const onChangeCheck = (e, value) => {
    if (e.target.value === 'checkAll' && e.target.checked) {
      return setValues([...tickets.filter((item) => item.status !== 4).map((item) => item.id)]);
    } if (e.target.value === 'checkAll' && !e.target.checked) {
      return setValues([]);
    }

    if (e.target.checked) {
      setValues([...values, value.id]);
    } else {
      setValues([...values.filter((item) => item !== value.id)]);
    }
  };

  const handleSelect = (key, title) => {
    setConfirmValues({
      key,
      title,
    });
    if (title === 'Assign') setIsAssign(true);
    toggleConfirm();
  };

  const onSubmitConfirm = async () => {
    try {
      await dispatch(submitMassAction({ ...confirmValues, values, setIsAssign }));
      setValues([]);
    } catch (error) {
      setValues([]);
      toggleConfirm();
    }
  };

  return (
    <Table>
      <ConfirmModal
        toggle={toggleConfirm}
        isOpen={isOpenConfirm}
        onSubmitConfirm={onSubmitConfirm}
        fetching={massFetching}
        title={isAssignAction ? 'Proceed to assign selected tickets to a selected account?' : 'Are you sure?'}
      />
      <thead>
        <tr className="tickets__head">
          {generateTableHead().map((item, index) => {
            switch (item) {
              case 'All':
                return (
                  <TableCheckAll
                    key={index}
                    handleSelect={handleSelect}
                    values={values}
                    config={config}
                    onChangeCheck={onChangeCheck}
                    accessMassActions={accessMassActions}
                  />
                );

              case 'Assignee':
                if (config.assignment) {
                  return (
                    <th key={index} className="tickets__status tickets_assignee">
                      <FilterAssign forAssign title={item} items={staff} />
                    </th>
                  );
                }
                return null;

              case 'Status':
                return (
                  <th key={index} className="tickets__status">
                    <Filter title={item} items={statuses} queryRequest="status" />
                  </th>
                );

              default:
                return (
                  <th key={index} className={item === 'ID' ? 'p-l' : ''}>
                    {item}
                  </th>
                );
            }
          })}
        </tr>
      </thead>
      <tbody>
        {tickets?.map((item, index) => (
          <tr key={index} className={values.includes(item.id) ? 'active' : ''}>
            {makeTableRow(item).map((elem, index) => {
              if (index === 3) {
                return (
                  <TableView
                    key={index}
                    item={item}
                    index={index}
                    elem={elem}
                    toggleView={toggleView}
                    config={config}
                  />
                );
              }

              if (elem === 'checkbox') {
                return (
                  <TableCheckbox
                    key={index}
                    item={item}
                    index={index}
                    config={config}
                    values={values}
                    onChangeCheck={onChangeCheck}
                  />
                );
              }

              if (index === 4) {
                return (
                  <td key={index}>
                    {elem.name}
                    {elem.locked && <i className="fas fa-lock statusIcon" />}
                  </td>
                );
              }

              if (!config.assignment && index === 5) return null;

              return (
                <td key={index} className={index === 1 || index === 5 ? 'p-l' : ''}>
                  {elem}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

TableTickets.propTypes = {
  tickets: PropTypes.array,
  accessMassActions: PropTypes.array,
  statuses: PropTypes.array,
  toggleView: PropTypes.func,
  values: PropTypes.array,
  setValues: PropTypes.func,
  config: PropTypes.object,
  staff: PropTypes.array,
};

export default TableTickets;
