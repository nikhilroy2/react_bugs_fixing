import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Pagination, Row, Col } from 'react-bootstrap';

import { getSignInHistoryAction } from '../../../../../redux/actions/users/actions';

import { makePaginationArray } from '../helpers';

const PaginationHistory = ({
  pages, currentPage, pagesLimit, userId, query,
}) => {
  const dispatch = useDispatch();

  const onClickFuncComponent = (n) => {
    dispatch(getSignInHistoryAction(userId, { query, page: n }));
  };

  return (
    <Row>
      <Col md={12}>
        {pages > 1 && (
        <Pagination className="history__pagination">
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
                                onClick={() => (currentPage === Number(item) ? null : onClickFuncComponent(item))}
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
    </Row>
  );
};

PaginationHistory.propTypes = {
  pages: PropTypes.number,
  currentPage: PropTypes.number,
  pagesLimit: PropTypes.number,
  userId: PropTypes.number,
  query: PropTypes.string,
};

export default PaginationHistory;
