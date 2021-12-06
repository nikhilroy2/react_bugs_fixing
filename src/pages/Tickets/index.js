import './_tickets.scss';
import './_tickets.dark-mode.scss';
import React, { useEffect, useState, useRef } from 'react';
import { Grid, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

import Modal from '../../components/Modal/Default';
import AddTicketForm from './components/AddTicket/index';
import Pagination from '../../components/Pagination';
import TableTickets from './components/TableTickets';
import FilterGroup from '../../components/Filters/FilterGroup';
import SearchGroup from '../../components/Search/SearchGroup';
import SearchButton from '../../components/Search/SearchButton';

import { showUnreadGenerateString, generateAccessMassDrop } from './helpers';
import { getTicketsList, getTicketsConfigAction } from '../../redux/actions/tickets';
import { getTicketsListSelector } from '../../redux/selectors/tickets';

const Tickets = () => {
  const formRef = useRef(null);
  const [values, setValues] = useState([]);

  const addIsFetching = useSelector((state) => state.tickets.addFetching);
  const ticketsState = useSelector((state) => getTicketsListSelector(state));

  const {
    isFetching,
    tickets,
    statuses,
    config,
    // filters,
    // access,
    search_types,
    pagination,
    staff,
    neededListRequest,
  } = ticketsState;

  const dispatch = useDispatch();
  const parsedStaff = staff?.map((el) => ({ title: `${el.title} (${el.count})`, id: el.id }));
  const history = useHistory();
  const location = useLocation();
  const queryString = qs.parse(location.search.slice(1));

  useEffect(() => {
    if (neededListRequest) {
      dispatch(getTicketsList(queryString));
      dispatch(getTicketsConfigAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.search]);

  useEffect(() => {
    setValues([]);
    document.title = 'Tickets';
  }, [location.search]);

  const accessMassActions = generateAccessMassDrop(config);

  const showUnread = () => {
    const showUnredQuery = showUnreadGenerateString(location);
    return history.push(`${location.pathname}${location.search}${showUnredQuery}`);
  };

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <Grid fluid>
      <Modal>
        <AddTicketForm
          toggle={toggle}
          isFetching={addIsFetching}
          showCloseButton
          open={open}
          setValues={setValues}
          modalText={{
            okBtnText: 'Add ticket',
            cancelBtnText: 'Close',
            title: 'Add ticket',
          }}
          formRef={formRef}
        />
      </Modal>
      <FilterGroup>
        {config?.create_ticket && (
        <li className="p-b">
          <Button onClick={() => toggle()}>Add ticket</Button>
        </li>
                )}
        <SearchGroup
          autocomplete="on"
          sectionName="ticket"
          withSelect
          options={search_types}
          placeholder="Search tickets"
        />
        {config?.unread_ticket && <SearchButton onClickButton={showUnread} buttonText="Show unread" />}
      </FilterGroup>
      {isFetching ? (
        <div className="modal-loader" />
      ) : (
        <>
          <TableTickets
            setValues={setValues}
            values={values}
            tickets={tickets}
            accessMassActions={accessMassActions}
            statuses={statuses}
            config={config}
            staff={parsedStaff}
          />
          <Pagination
            pages={pagination?.pages}
            currentPage={pagination?.current_page}
            itemsCount={pagination?.total_count}
            pageSize={pagination?.page_size}
            pagesLimit={pagination?.pages < 10 ? pagination?.pages : 10}
          />
        </>
      )}
    </Grid>
  );
};

export default Tickets;
