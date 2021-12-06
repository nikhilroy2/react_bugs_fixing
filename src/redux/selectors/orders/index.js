import { createSelector } from 'reselect';

const getOrdersState = (state) => state.orders;

export const ordersSelector = createSelector([getOrdersState], (ordersState) => {
  const {
    orders, pagination, statuses, access, filters,
  } = ordersState.data;

  const {
    isFetching, actionFetching, config, orderDetails, users,
  } = ordersState;
  const orderDetailsFormat = Object.values(orderDetails);

  return {
    orders,
    pagination,
    statuses,
    access,
    filters,
    isFetching,
    actionFetching,
    config,
    orderDetails: orderDetailsFormat,
    users,
  };
});
