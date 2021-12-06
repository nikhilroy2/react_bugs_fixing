import './_orders.scss';
import './_orders.dark-mode.scss';
import React, { useState, useEffect } from 'react';
import { Grid } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import _ from 'lodash';

import FilterGroup from '../../components/Filters/FilterGroup';
import SearchGroup from '../../components/Search/SearchGroup';
import SearchButton from '../../components/Search/SearchButton';
import Tabs from '../../components/Tabs';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/Modal/Confirm';
import Modal from '../../components/Modal/Default';
import DetailsModal from '../../components/Modal/Details';
import OrdersTable from './components/OrdersTable';
import SetEditForm from './components/SetEditForm';

import {
  getOrdersConfigActions,
  getOrdersListAction,
  resendOrderAction,
  clearOrdersStateAction,
} from '../../redux/actions/orders';
import { ordersSelector } from '../../redux/selectors/orders';
import { generateAccessMassDrop, onSubmitConfirValue, detectSelectedTitle } from './helpers';
import { detectActionAndSubmit } from './components/SetEditForm/helpers';

const Orders = () => {
  const history = useHistory();
  const location = useLocation();
  const queryString = qs.parse(location.search.slice(1));

  const dispatch = useDispatch();
  const ordersState = useSelector((state) => ordersSelector(state));
  const {
    orders,
    pagination,
    // statuses,
    access,
    // filters,
    isFetching,
    actionFetching,
    config,
    orderDetails,
  } = ordersState;

  const [modalSettings, setModalSettings] = useState({});
  const [values, setValues] = useState([]);
  const [isOpenConfirm, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [confirmValues, setConfirmValues] = useState({
    key: null,
    title: '',
  });

  const toggleConfirm = () => setIsOpen(!isOpenConfirm);
  const toggleDetails = () => setOpenDetails(!openDetails);
  const toggle = () => setOpen(!open);

  useEffect(() => {
    dispatch(getOrdersListAction(queryString));
    dispatch(getOrdersConfigActions());
    setValues([]);
    document.title = 'Orders';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.search]);

  const accessMassActions = generateAccessMassDrop(access);

  const onChangeCheck = (e, value) => {
    if (e.target.value === 'checkAll' && e.target.checked) {
      return setValues([...orders.filter((item) => item.status !== 4).map((item) => item.id)]);
    } if (e.target.value === 'checkAll' && !e.target.checked) {
      return setValues([]);
    }

    if (e.target.checked) {
      setValues([...values, value.id]);
    } else {
      setValues([...values.filter((item) => item !== value.id)]);
    }
  };

  const handleSelect = (key, title, item) => {
    if (title === 'Resend order') {
      return dispatch(resendOrderAction(item.id));
    }

    return detectSelectedTitle(
      key,
      title,
      item,
      dispatch,
      setConfirmValues,
      setModalSettings,
      toggle,
      toggleDetails,
      toggleConfirm,
    );
  };

  const onSubmitConfirm = () => {
    dispatch(onSubmitConfirValue(confirmValues));
    toggleConfirm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toggle();
      await dispatch(detectActionAndSubmit(modalSettings));
    } catch (error) {
      toggle();
    }
  };

  return (
    <Grid fluid>
      <ConfirmModal
        toggle={toggleConfirm}
        isOpen={isOpenConfirm}
        onSubmitConfirm={onSubmitConfirm}
        title="Are you sure?"
      />

      <Modal>
        <SetEditForm
          showCloseButton
          toggle={toggle}
          open={open}
          className="modal-md"
          modalText={{
            okBtnText: '',
            cancelBtnText: '',
            title: '',
          }}
          handleSubmit={handleSubmit}
          setErrorText={setErrorText}
          errorText={errorText}
          forNativeForm
          setModalSettings={setModalSettings}
          modalSettings={modalSettings}
          {...modalSettings}
        />
      </Modal>

      <DetailsModal
        isOpen={openDetails}
        toggleModal={toggleDetails}
        detailsData={orderDetails}
        actionFetching={actionFetching}
        clearStateAction={clearOrdersStateAction}
        {...modalSettings}
      />

      <FilterGroup>
        {config?.access?.filters && <Tabs tab="status" tabsData={config?.statuses} forAwaitingRaplace />}
        <SearchGroup
          autocomplete="on"
          sectionName="ticket"
          withSelect
          options={config?.search_types?.map((item) => {
            if (item.title === 'Provider Name') {
              return {
                ...item,
                title: 'Provider',
              };
            }

            return item;
          })}
          placeholder="Search orders"
        />
        {config?.access?.export_list && (
        <SearchButton onClickButton={() => history.push('/admin/ordersnew/export')} buttonText="Export" />
                )}
      </FilterGroup>

      {isFetching ? (
        <div className="modal-loader" />
      ) : (
        <>
          {config?.access?.list && !_.isEmpty(config) && (
            <OrdersTable
              values={values}
              setValues={setValues}
              onChangeCheck={onChangeCheck}
              handleSelect={handleSelect}
              config={config}
              orders={orders}
              accessMassActions={accessMassActions}
              toggleConfirm={toggleConfirm}
              orderDetails={orderDetails}
              actionFetching={actionFetching}
            />
                    )}
          {config?.access?.list && (
            <Pagination
              pages={pagination?.pages}
              currentPage={pagination?.current_page}
              itemsCount={pagination?.total_count}
              pageSize={pagination?.page_size}
              pagesLimit={pagination?.pages < 10 ? pagination?.pages : 10}
              withPageSizer
            />
                    )}
        </>
      )}
    </Grid>
  );
};

export default Orders;
