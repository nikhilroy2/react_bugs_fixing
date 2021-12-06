import { createSelector } from 'reselect';

const getrefillState = (state) => state.refill;

export const getRefillSelector = createSelector([getrefillState], (refillState) => {
  const {
    tasks, pagination, statuses, access, filters,
  } = refillState.data;

  const {
    isFetching, config, modes, services, task, actionFetching, details,
  } = refillState;

  return {
    tasks,
    pagination,
    statuses,
    access,
    filters,
    isFetching,
    config,
    modes,
    services,
    task,
    actionFetching,
    details,
  };
});
