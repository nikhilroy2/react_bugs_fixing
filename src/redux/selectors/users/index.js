import { createSelector } from 'reselect';

const getUsersState = (state) => state.users;

export const getUsersListSelector = createSelector([getUsersState], (usersState) => {
  const {
    users, pagination, statuses, sort, fields, access, filters,
  } = usersState.data;
  const { isFetching, ratesFetching } = usersState;
  const {
    userRates, servicesList, ratesUserId, servicesFetching,
  } = usersState;

  return {
    isFetching,
    ratesFetching,
    servicesFetching,
    users,
    pagination,
    statuses,
    columns: sort?.columns,
    fields,
    access,
    filters,
    userRates,
    ratesUserId,
    servicesList,
  };
});

export const getDataForExport = createSelector([getUsersState], (usersState) => {
  const {
    exportData, config, configFetching, exportListFetching,
  } = usersState;

  return {
    data: exportData,
    config,
    configFetching,
    exportListFetching,
  };
});

// User sign-in history
export const userSigninHistorySelector = createSelector([getUsersState], (usersState) => {
  const { signInHistory } = usersState;
  const { history, pagination, userId } = signInHistory;

  return {
    history,
    pagination,
    userId,
  };
});
