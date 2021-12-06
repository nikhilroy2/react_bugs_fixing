import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import qs from 'qs';

import { getExportList } from '../../../redux/actions/users/actions';
import { getUserConfigs } from '../../../redux/actions/users/general';
import { getDataForExport } from '../../../redux/selectors/users';

import Form from './components/Form';
import Table from './components/Table';
import Pagination from '../../../components/Pagination';
import CustomizeModal from './components/CustomizeModal';
import { validExportColumns } from './helpers';

const Export = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryString = qs.parse(location.search.slice(1));

  const {
    config, data, configFetching, exportListFetching,
  } = useSelector((state) => getDataForExport(state));
  const { exports: items, pagination } = data;
  const { export_columns, access, fields } = config;
  const valideExportColumns = validExportColumns(export_columns, fields);

  const [open, setOpen] = useState(false);
  const [includeColumns, setInclude] = useState([]);
  const toggle = () => setOpen(!open);

  useEffect(() => {
    setInclude(valideExportColumns?.filter((el) => el.checked));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [export_columns]);

  useEffect(() => {
    if (_.isEmpty(config.export_formats)) {
      dispatch(getUserConfigs());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(getExportList(queryString));
    document.title = 'Export users';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, dispatch]);

  return (
    <Grid>
      <CustomizeModal
        open={open}
        toggle={toggle}
        className="customizeModal"
        items={valideExportColumns}
        setInclude={setInclude}
        include={includeColumns}
        fields={fields}
      />

      {configFetching ? (
        <div className="modal-loader" />
      ) : (
        <>
          {access?.export_make && <Form include={includeColumns} toggle={toggle} />}
          {exportListFetching ? (
            <div className="table-loader" />
          ) : (
            <>
              <Table access={access} items={items} />
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

export default Export;
