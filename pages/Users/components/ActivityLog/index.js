import './_activity-log.scss';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { onClearUserData } from '../../../../redux/actions/users/actions';

const ActivityLog = () => {
  const dispatch = useDispatch();
  const activityLogs = useSelector((state) => state.users.activityLog);

  useEffect(() => () => {
    dispatch(onClearUserData());
  }, [dispatch]);

  return (
    <Table className="table__activity">
      <thead>
        <tr>
          <th>IP</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {activityLogs?.map((item, index) => (
          <tr key={index}>
            <td>{item.ip}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ActivityLog;
