import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  FormGroup, InputGroup, FormControl, Button, Form, Glyphicon,
} from 'react-bootstrap';

import { getSignInHistoryAction } from '../../../../../redux/actions/users/actions';

const SignInFilter = ({ userId, query, setQuery }) => {
  const dispatch = useDispatch();

  const doRequest = (e) => {
    e.preventDefault();
    dispatch(getSignInHistoryAction(userId, { query }));
  };

  return (
    <li className="pull-right nav-tabs__search">
      <Form inline onSubmit={doRequest}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search by IP"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="sign-in-search"
              name="sign-in-ticketsSearch"
            />
            <InputGroup.Button>
              <Button className="customSearchButton" onClick={(e) => doRequest(e)}>
                <Glyphicon glyph="search" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </li>
  );
};

SignInFilter.propTypes = {
  userId: PropTypes.number,
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

export default SignInFilter;
