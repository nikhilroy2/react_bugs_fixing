import './_pagination.scss';
import './_pagination.dark-mode.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { Pagination, Row, Col } from 'react-bootstrap';
import qs from 'qs';

import { generateQueryString, makePaginationArray, formatedStringCounters } from './helpers';

const PaginationComponent = ({
  pages,
  currentPage,
  itemsCount,
  pageSize,
  pagesLimit,
  onClickFunc,
  withPageSizer,
  hideCountText,
}) => {
  const location = useLocation();
  const history = useHistory();
  const queryString = qs.parse(location.search.slice(1));

  const [selectValue, setSelectValue] = useState('100');

  const onClickFuncComponent = (n) => {
    if (onClickFunc !== undefined) {
      return onClickFunc(n);
    }

    const { pageSearch, hasQueryPage } = generateQueryString(location, n);

    if (hasQueryPage) {
      return history.push(`${location.pathname}${location.search.replace(/page=\d+/, `page=${n}`)}`);
    }

    return history.push(`${location.pathname}${location.search}${pageSearch}`);
  };

  useEffect(() => {
    setSelectValue(queryString.page_size);
  }, [queryString]);

  const onChangePageSize = (e) => {
    if (e.target.value === '100') {
      delete queryString.page_size;
    } else {
      queryString.page_size = e.target.value;
    }

    if (queryString.page) {
      delete queryString.page;
    }

    history.push(`${location.pathname}?${(location.search = qs.stringify(queryString))}`);
  };

  return (
    <Row>
      <Col sm={withPageSizer ? 7 : 8}>
        {pages > 1 && (
        <Pagination>
          {currentPage !== 1 ? (
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => (currentPage === 1 ? null : onClickFuncComponent(currentPage - 1))}
            />
          ) : null}
          {pages
          && makePaginationArray(pages, currentPage, pagesLimit)?.map((item) => (
            <Pagination.Item
              key={item}
              active={currentPage === Number(item)}
              onClick={() => onClickFuncComponent(item)}
            >
              {item}
            </Pagination.Item>
          ))}
          {currentPage !== pages ? (
            <Pagination.Last
              disabled={currentPage === pages}
              onClick={() => (currentPage === pages ? null : onClickFuncComponent(currentPage + 1))}
            />
          ) : null}
        </Pagination>
        )}
      </Col>
      {!hideCountText && itemsCount > 0 && (
        <Col sm={withPageSizer ? 5 : 4} className="pagination-counters">
          {formatedStringCounters(currentPage, pageSize, itemsCount)}
          {withPageSizer && '.'}
          {withPageSizer && (
          <span className="m-l">
            Records per page
            {' '}
            <select value={selectValue} onChange={onChangePageSize} className="pagination-select">
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
          </span>
          )}
        </Col>
      )}
    </Row>
  );
};

PaginationComponent.propTypes = {
  pages: PropTypes.number,
  currentPage: PropTypes.number,
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  pagesLimit: PropTypes.number,
  onClickFunc: PropTypes.func,
  withPageSizer: PropTypes.bool,
  hideCountText: PropTypes.func,
};

export default PaginationComponent;
