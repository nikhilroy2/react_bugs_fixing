import './_export.scss';
import './_export.dark-mode.scss';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'react-bootstrap';

import CustomizeModal from './components/CustomizeModal';

import OrdersForm from './components/Form';

import { ordersSelector } from '../../../redux/selectors/orders';
import { getOrdersConfigActions } from '../../../redux/actions/orders';
import { accessFieldsColums } from './helpers';

const Export = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const ordersState = useSelector((state) => ordersSelector(state));
  const { config, users } = ordersState;
  const { fields, export_columns, access } = config;

  const [open, setOpen] = useState(false);
  const [includeColumns, setInclude] = useState([]);
  const toggle = () => setOpen(!open);

  useEffect(() => {
    document.title = 'Orders export';
    dispatch(getOrdersConfigActions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, dispatch]);

  useEffect(() => {
    // setInclude(valideExportColumns?.filter((el) => el.checked));
    setInclude(accessFieldsColums(fields, export_columns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [export_columns]);

  return (
    <Grid fluid>
      <CustomizeModal
        open={open}
        toggle={toggle}
        className="customizeModal"
        items={export_columns}
        setInclude={setInclude}
        include={includeColumns}
        fields={fields}
      />
      {access?.export_make && <OrdersForm include={includeColumns} toggle={toggle} users={users} />}
    </Grid>
  );
};

export default Export;
