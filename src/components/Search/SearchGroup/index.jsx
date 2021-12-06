import '../_search.scss';
import '../_search.dark-mode.scss';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { useLocation, useHistory } from 'react-router-dom';
import {
  FormGroup, InputGroup, FormControl, Button, Form, Glyphicon,
} from 'react-bootstrap';
import qs from 'qs';
import _ from 'lodash';

import { detectQueryValue, searchRequest } from './helpers';

const Search = ({
  placeholder, options, withSelect, autoComplete, sectionName,
}) => {
  const history = useHistory();
  const location = useLocation();

  const { t } = useTranslation();

  const haveOptions = options && options.length;

  const [searchQuery, setSearchQuery] = useState('');
  const [type, setType] = useState(haveOptions ? options[0].id : '');

  const query = detectQueryValue(haveOptions, withSelect, searchQuery, type);
  const queryString = qs.parse(location.search.slice(1));

  useEffect(() => {
    const inQueryString = _.has(queryString, 'query');

    if (inQueryString) {
      const getParams = _.pick(queryString, ['query', 'search_type']);

      setSearchQuery(getParams.query);
      haveOptions && setType(Number(getParams.search_type));
    } else {
      setSearchQuery('');
      haveOptions && setType(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveOptions, setType, options, setSearchQuery, location.search]);

  const doRequest = (e) => {
    e.preventDefault();
    return searchRequest(searchQuery, query, location, history, queryString);
  };

  return (
    <li className="pull-right nav-tabs__search">
      <Form inline className={withSelect ? 'customSearch' : ''} onSubmit={doRequest}>
        <FormGroup>
          <InputGroup>
            <FormControl
              className={withSelect ? 'customSearchInput' : ''}
              type="text"
              placeholder={t(`SearchGroup.Placeholder.${placeholder}`)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete={autoComplete}
              id={`${sectionName}Search`}
              name={`${sectionName}ticketsSearch`}
            />
            <InputGroup.Button>
              {withSelect && (
                <span className="selectWrapper">
                  <FormControl
                    className="search-select"
                    componentClass="select"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    {options?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </FormControl>
                </span>
              )}
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

Search.defaultProps = {
  placeholder: 'placeholder',
  options: [{ title: 'Options', id: 0 }],
};

Search.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  withSelect: PropTypes.bool,
  autoComplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sectionName: PropTypes.string,
};

export default Search;
