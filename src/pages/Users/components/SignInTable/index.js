import './_signin.scss';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Pagination from './components/pagination';
import FilterGroup from '../../../../components/Filters/FilterGroup';
import SignInFilter from './components/filter';

import { onClearUserData } from '../../../../redux/actions/users/actions';
import { userSigninHistorySelector } from '../../../../redux/selectors/users';

const SignInTable = () => {
  const dispatch = useDispatch();
  const { history, pagination, userId } = useSelector((state) => userSigninHistorySelector(state));

  const [query, setQuery] = useState('');

  useEffect(() => () => {
    dispatch(onClearUserData());
  }, [dispatch]);

  return (
    <>
      <FilterGroup>
        <SignInFilter
          userId={userId}
          query={query}
          setQuery={setQuery}
        />
      </FilterGroup>
      <Table className="table__signin">
        <thead>
          <tr>
            <th>Date, time</th>
            <th>IP</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((item, index) => (
            <tr key={index}>
              <td>{item.created_at.split(' ').join(', ')}</td>
              <td>{item.ip}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        query={query}
        userId={userId}
        pages={pagination?.pages}
        currentPage={pagination?.current_page}
        pagesLimit={pagination?.pages < 10 ? pagination?.pages : 10}
      />
    </>
  );
};

export default SignInTable;
