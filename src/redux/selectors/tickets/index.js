import { createSelector } from 'reselect';

const getTicketsState = (state) => state.tickets;

export const getTicketsListSelector = createSelector(
  [getTicketsState],
  (ticketState) => {
    const {
      tickets,
      pagination,
      statuses,
      filters,
      search_types,
      staff,
    } = ticketState.data;

    const { isFetching, config, neededListRequest } = ticketState;
    return {
      isFetching,
      tickets,
      config,
      statuses,
      filters,
      search_types,
      pagination,
      staff,
      neededListRequest,
    };
  },
);

const getTicketView = (state) => state.tickets.view;

export const getTicketViewSelector = createSelector(
  [getTicketView, getTicketsState],
  (ticketView, ticketState) => {
    const { isFetching } = ticketState;
    // const { staff, assigned_admin_id } = ticketView;

    return {
      ...ticketView,
      isFetching,
      title: ticketView.subject,
      locked: !!ticketView.locked,
    }
  },
)

export const getTicketsConfigSelector = createSelector(
  [getTicketsState],
  (ticketsState) => {
    const { config } = ticketsState;
    const { assignment } = config;
    const { staff, assigned_admin_id } = ticketsState.view;
    const { addFetching } = ticketsState;
    const parsed = staff?.map((el) => ({ id: el.id, title: el.login }));

    return {
      config,
      staff: parsed,
      assignment,
      fetching: addFetching,
      assignedAdminId: assigned_admin_id || -1,
    }
  },
);
