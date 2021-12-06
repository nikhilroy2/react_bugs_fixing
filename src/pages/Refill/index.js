import './_refill.scss';
import React, { useState, useEffect } from 'react';
import { Grid } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { isEmpty } from 'lodash';

import FilterGroup from '../../components/Filters/FilterGroup';
import SearchGroup from '../../components/Search/SearchGroup';
import Tabs from '../../components/Tabs';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/Modal/Confirm';
import ViewModal from './components/ViewModal';
import DetailsModal from '../../components/Modal/Details';
import RefillTable from './components/RefillTable';

import {
  getRefillListAction,
  getRefillConfigAction,
  clearRefillState,
  bulkResendRefillAction,
  bulkUpdateRefillStatusAction,
} from '../../redux/actions/refill';
import { getRefillSelector } from '../../redux/selectors/refill';

const Refill = () => {
  const dispatch = useDispatch();
  const refillState = useSelector((state) => getRefillSelector(state));
  const {
    tasks,
    pagination,
    statuses,
    access,
    isFetching,
    actionFetching,
    config,
    task,
    details,
  } = refillState;

  const location = useLocation();
  const queryString = qs.parse(location.search.slice(1));

  const [values, setValues] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const [isOpenConfirm, setIsOpen] = useState(false);
  const [confirmValues, setConfirmValues] = useState({
    key: null,
    title: '',
  });
  const toggleConfirm = () => setIsOpen(!isOpenConfirm);

  const [openView, setOpenView] = useState(false);
  const toggleView = () => setOpenView(!openView);

  const [openSuperDetail, setOpenSuperDetail] = useState(false);
  const toggleSuperDetail = () => setOpenSuperDetail(!openSuperDetail);

  useEffect(() => {
    dispatch(getRefillListAction(queryString));
    if (isEmpty(config)) {
      dispatch(getRefillConfigAction());
    }
    setValues([]);

    document.title = 'Refill';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location]);

  const onSubmitConfirm = () => {
    const { key, title } = confirmValues;

    switch (title) {
      case 'Change status':
        dispatch(bulkUpdateRefillStatusAction({ status: key, tasks: values }, setValues));
        break;

      case 'Resend':
        dispatch(bulkResendRefillAction({ tasks: values }, setValues));
        break;

      default:
        break;
    }

    toggleConfirm();
  };

  return (
    <Grid fluid>
      <ConfirmModal
        toggle={toggleConfirm}
        isOpen={isOpenConfirm}
        onSubmitConfirm={onSubmitConfirm}
        fetching={actionFetching}
        title="Are you sure?"
      />

      <ViewModal
        isOpen={openView}
        toggleModal={toggleView}
        actionFetching={actionFetching}
        clearStateAction={() => dispatch(clearRefillState())}
        item={task}
      />

      <DetailsModal
        detailsData={details}
        isOpen={openSuperDetail}
        toggleModal={toggleSuperDetail}
        title="Details for superadmin"
        actionFetching={actionFetching}
        clearStateAction={() => dispatch(clearRefillState())}
        item={task}
      />

      <FilterGroup>
        <Tabs tab="status" tabsData={statuses} />
        <SearchGroup
          autocomplete="on"
          sectionName="refill"
          withSelect
          options={config?.search_types}
          placeholder="Search"
        />
      </FilterGroup>

      {isFetching ? (
        <div className="modal-loader" />
      ) : (
        <>
          {config?.access?.list && (
            <RefillTable
              values={values}
              setValues={setValues}
              config={config}
              tasks={tasks}
              setSelectedTasks={setSelectedTasks}
              selectedTasks={selectedTasks}
              access={access}
              toggleView={toggleView}
              setConfirmValues={setConfirmValues}
              toggleConfirm={toggleConfirm}
              toggleSuperDetail={toggleSuperDetail}
            />
          )}
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

export default Refill;
