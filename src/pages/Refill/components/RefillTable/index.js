import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import TableBody from './tableBody';
import TableHead from './tableHead';

import * as refillActions from '../../../../redux/actions/refill';

const RefillTable = ({
  values,
  setValues,
  tasks,
  setSelectedTasks,
  selectedTasks,
  access,
  toggleView,
  setConfirmValues,
  toggleConfirm,
  toggleSuperDetail,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onChangeCheck = (e, value) => {
    if (e.target.value === 'checkAll' && e.target.checked) {
      setSelectedTasks([
        ...tasks.filter((item) => item.status !== 4 && item.status !== 6 && item.status !== 7 && item.status !== 3 && item.status !== 2),
      ]);
      return setValues([
        ...tasks
          .filter((item) => item.status !== 4 && item.status !== 6 && item.status !== 7 && item.status !== 3 && item.status !== 2)
          .map((item) => item.id),
      ]);
    } if (e.target.value === 'checkAll' && !e.target.checked) {
      setSelectedTasks([]);
      return setValues([]);
    }

    if (e.target.checked) {
      setValues([...values, value.id]);
      setSelectedTasks([...selectedTasks, value]);
    } else {
      setValues([...values.filter((item) => item !== value.id)]);
      setSelectedTasks([...selectedTasks.filter((item) => item !== value)]);
    }
  };

  const handleSelect = (props, type) => {
    const { key, title, id } = props;

    switch (type) {
      case 'mass':
        setConfirmValues({
          key,
          title,
        });

        toggleConfirm();
        break;

      case 'single':
        if (title === t('ActionsList.Details')) {
          dispatch(refillActions.viewRefillTaskAction(id));
          toggleView();
        } else if (title === t('ActionsList.Details for superadmin')) {
          dispatch(refillActions.superDetailsRefillAction(id));
          toggleSuperDetail();
        } else if (title === t('ActionsList.Resend')) {
          dispatch(refillActions.resendRefillTaskAction(id));
        } else if (title === t('ActionsList.Change status')) {
          dispatch(refillActions.changeRefillStatusAction(id, key));
        }

        break;

      default:
        break;
    }
  };

  return (
    <Table className="table-grey table__refill">
      <TableHead
        values={values}
        onChangeCheck={onChangeCheck}
        handleSelect={handleSelect}
        access={access}
      />
      <TableBody
        tasks={tasks}
        values={values}
        onChangeCheck={onChangeCheck}
        handleSelect={handleSelect}
        access={access}
      />
    </Table>
  );
};

RefillTable.propTypes = {
  key: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  values: PropTypes.array,
  setValues: PropTypes.func,
  tasks: PropTypes.array,
  setSelectedTasks: PropTypes.func,
  selectedTasks: PropTypes.array,
  access: PropTypes.object,
  toggleView: PropTypes.func,
  setConfirmValues: PropTypes.func,
  toggleConfirm: PropTypes.func,
  toggleSuperDetail: PropTypes.func,
};

export default RefillTable;
