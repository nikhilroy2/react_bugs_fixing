import './_users.scss';
import './_users.dark-mode.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';

import TableUsers from './components/TableUsers';
import Modal from '../../components/Modal/Default';
import FilterGroup from '../../components/Filters/FilterGroup';
import SearchGroup from '../../components/Search/SearchGroup';
import SearchButton from '../../components/Search/SearchButton';
import Pagination from '../../components/Pagination';
import Form from './components/UserForm';

import { getUsersListAction, getUserConfigs } from '../../redux/actions/users/general';
import { getUsersListSelector } from '../../redux/selectors/users';
import { getModal, detectDataValue, getMassAccess } from './helpers';

const Users = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const ref = useRef(null);

  const userData = useSelector((state) => state.users.userData);
  const configCopy = JSON.parse(JSON.stringify(useSelector((state) => state.users.config)));

  const [userSelected, setSelected] = useState(false);
  const queryString = qs.parse(location.search.slice(1));

  const [values, setValues] = useState([]);
  const [ratesValues, setRatesValues] = useState([]);
  const [selectedUsers, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [Settings, setSettings] = useState({ modalText: {}, Form });
  const [key, setKey] = useState(0);
  const [wasAddRates, setWasAddRates] = useState(false);

  const inc = () => setKey(key + 1);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const openModal = (modalIndex, user) => {
    setSelected(false);
    setSettings(getModal(modalIndex, user));
    toggle();
  };

  const actionFetching = useSelector((state) => state.users.actionFetching);
  const userState = useSelector((state) => getUsersListSelector(state));
  const {
    isFetching,
    ratesFetching,
    servicesFetching,
    users,
    pagination,
    userRates,
    statuses,
    columns,
    fields,
    access,
  } = userState;
  const config = useSelector((state) => state.users.config);
  const accessMassActions = getMassAccess(config.access);

  useEffect(() => {
    dispatch(getUserConfigs());
    dispatch(getUsersListAction(queryString));
    setValues([]);
    document.title = 'Users';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.search, key]);

  return (
    <Grid fluid>
      <Modal bsSize={Settings.size}>
        <Settings.Form
          config={config}
          isFetching={actionFetching}
          isDisabled={userSelected}
          selectedUsers={selectedUsers}
          setValues={setValues}
          setUsers={setUsers}
          ratesValues={ratesValues}
          setRatesValues={setRatesValues}
          setWasAddRates={setWasAddRates}
          showCloseButton
          toggle={toggle}
          values={values}
          formRef={ref}
          fields={fields}
          open={open}
          userData={userData}
          configCopy={configCopy}
          setSelected={setSelected}
          isData={Settings.forAddRates && detectDataValue(userRates, ratesValues, wasAddRates)}
          modalHoverLoader={ratesFetching || servicesFetching || actionFetching}
          forAddRates={Settings.forAddRates}
          forEditUser={Settings.forEditUser}
          ratesFetching={ratesFetching}
          clearValue={() => setRatesValues([])}
          {...Settings}
        />
      </Modal>
      <FilterGroup>
        {config.access?.create_user && <Button onClick={() => openModal(1)}>Add user</Button>}
        <SearchGroup autocomplete="on" sectionName="users" placeholder="Search users" />
        {config.access?.export_list && (
          <SearchButton onClickButton={() => history.push('/admin/users/export')} buttonText="Export" />
        )}
      </FilterGroup>
      {isFetching ? (
        <div className="modal-loader" />
      ) : (
        <>
          {access?.list && (
            <>
              <TableUsers
                setValues={setValues}
                values={values}
                setUsers={setUsers}
                selectedUsers={selectedUsers}
                access={access}
                users={users}
                accessMassActions={accessMassActions}
                statuses={statuses}
                fields={fields}
                columns={columns}
                openModal={openModal}
                inc={inc}
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
        </>
      )}
    </Grid>
  );
};

export default Users;
