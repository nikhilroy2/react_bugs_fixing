import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import TableBody from './tableBody';
import TableHead from './tableHead';

const OrdersTable = ({
  values,
  setValues,
  onChangeCheck,
  handleSelect,
  config,
  orders,
  accessMassActions,
  orderDetails,
  actionFetching,
}) => (
  <Table className="table-grey table__orders">
    <TableHead
      values={values}
      setValues={setValues}
      onChangeCheck={onChangeCheck}
      config={config}
      accessMassActions={accessMassActions}
    />
    <TableBody
      orders={orders}
      values={values}
      onChangeCheck={onChangeCheck}
      handleSelect={handleSelect}
      config={config}
      orderDetails={orderDetails}
      actionFetching={actionFetching}
    />
  </Table>
);

OrdersTable.propTypes = {
  values: PropTypes.array,
  setValues: PropTypes.func,
  onChangeCheck: PropTypes.func,
  handleSelect: PropTypes.func,
  config: PropTypes.object,
  orders: PropTypes.array,
  accessMassActions: PropTypes.array,
  orderDetails: PropTypes.array,
  actionFetching: PropTypes.bool,
};

export default OrdersTable;
