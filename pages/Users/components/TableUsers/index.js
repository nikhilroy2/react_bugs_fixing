import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import TableBody from './tableBody';
import TableHead from './tableHead';
import ConfirmModal from '../../../../components/Modal/Confirm';

import { onChangeUserStatus, getActivityLogAction, getUserDataAction, getSignInHistoryAction } from '../../../../redux/actions/users/actions';

import { generateTableHead, makeTableRow, generateActiveClass, submitMassAction } from '../../helpers';

const TableUsers = ({ access, users, accessMassActions, statuses, values, setValues, inc, fields, columns, openModal, setUsers, selectedUsers }) => {
  const dispatch = useDispatch();

  const [isOpenConfirm, setIsOpen] = useState(false);
  const actionFetching = useSelector((state) => state.users.actionFetching);
  const [confirmValues, setConfirmValues] = useState({
    key: null,
    title: '',
    id: 0,
  });
  const toggleConfirm = () => setIsOpen(!isOpenConfirm);

  const onChangeCheck = (e, value) => {
    if (e.target.value === 'checkAll' && e.target.checked) {
      setUsers([...users.filter((item) => item.status !== 4)]);
      return setValues([...users.filter((item) => item.status !== 4).map((item) => item.id)]);
    }
    if (e.target.value === 'checkAll' && !e.target.checked) {
      setUsers([]);
      return setValues([]);
    }

    if (e.target.checked) {
      setValues([...values, value.id]);
      setUsers([...selectedUsers, value]);
    } else {
      setValues([...values.filter((item) => item !== value.id)]);
      setUsers([...selectedUsers.filter((item) => item !== value)]);
    }
  };

  const handleSelect = (key, title, item) => {
    if (title === 'Sign in as user') {
      return window.open(`${window.location.origin}/admin/users/sign-as-user?id=${item.id}`, '_blank');
    }

    if (title === 'Copy rates') {
      return openModal(3, item);
    }
    if (title === 'Set password') {
      return openModal(0, item);
    }
    if (title === 'Copy rates from user') {
      return openModal(4);
    }
    if (title === 'Activity log') {
      dispatch(getActivityLogAction(item.id));
      return openModal(6, item);
    }
    if (title === 'Edit user') {
      dispatch(getUserDataAction(item.id));
      return openModal(2, item);
    }
    if (title === 'Sign-in history') {
      dispatch(getSignInHistoryAction(item.id));
      return openModal(7, item);
    }

    if (item) {
      setConfirmValues({
        key,
        title,
        id: item.id,
      });
    } else {
      setConfirmValues({
        key,
        title,
      });
    }
    toggleConfirm();
  };

  const onSubmitConfirm = async () => {
    try {
      switch (confirmValues.title) {
        case 'Suspend user': {
          await dispatch(onChangeUserStatus(confirmValues.id, 1));
          break;
        }
        case 'Activate user': {
          await dispatch(onChangeUserStatus(confirmValues.id, 0));
          break;
        }
        default: {
          await dispatch(
            submitMassAction({
              ...confirmValues,
              values,
              openModal,
              setUsers,
            }),
          );
        }
      }
      inc();
      setValues([]);
    } catch (err) {
      toggleConfirm();
    }
  };

  return (
    <Table>
      <ConfirmModal toggle={toggleConfirm} isOpen={isOpenConfirm} onSubmitConfirm={onSubmitConfirm} fetching={actionFetching} />
      <thead>
        <tr className="users__head">
          {generateTableHead(fields, columns)?.map((item, index) => (
            <TableHead
              item={item}
              key={index}
              handleSelect={handleSelect}
              values={values}
              access={access}
              onChangeCheck={onChangeCheck}
              accessMassActions={accessMassActions}
              statuses={statuses}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {users?.map((item, index) => (
          <tr key={index} className={generateActiveClass(values, item)}>
            {makeTableRow(item, fields).map((elem, index) => (
              <TableBody
                key={index}
                access={access}
                values={values}
                index={index}
                item={item}
                elem={elem}
                handleSelect={handleSelect}
                onChangeCheck={onChangeCheck}
                openModal={openModal}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

TableUsers.propTypes = {
  access: PropTypes.object,
  users: PropTypes.array,
  accessMassActions: PropTypes.array,
  statuses: PropTypes.array,
  values: PropTypes.array,
  setValues: PropTypes.func,
  fields: PropTypes.object,
  columns: PropTypes.array,
  inc: PropTypes.func,
  openModal: PropTypes.func,
  setUsers: PropTypes.func,
  selectedUsers: PropTypes.array,
};

export default TableUsers;
