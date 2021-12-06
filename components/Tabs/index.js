import './_tabs.scss';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Nav, NavItem, Badge } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import _ from 'lodash';

import { setQueryStringValue } from './helper';

const Tabs = ({ tab, tabsData, forAwaitingRaplace }) => {
  const history = useHistory();
  const location = useLocation();

  const { t } = useTranslation();

  const [activeValue, setActiveValue] = useState();

  useEffect(() => {
    const queryString = qs.parse(location.search.slice(1));

    if (_.isNaN(Number(queryString[tab]))) {
      setActiveValue(-1);
    } else {
      setActiveValue(Number(queryString[tab]));
    }
  }, [location.search, tab]);

  const findAwaiting = tabsData?.find((tab) => tab.title === 'Awaiting');
  const formatedTabsOutAwaiting = [
    {
      id: -1,
      title: 'All',
    },
    findAwaiting,
    ...tabsData?.filter((tab) => tab.title !== 'Awaiting' && tab.title !== 'All'),
  ];

  const defaultTabsWithAll = [
    {
      id: -1,
      title: 'All',
    },
    ...tabsData?.filter((tab) => tab.title !== 'All'),
  ];

  const formatedTabs = forAwaitingRaplace ? formatedTabsOutAwaiting : defaultTabsWithAll;

  return (
    <Nav
      bsStyle="pills"
      className="tabs"
      activeKey={activeValue}
      onSelect={(key) => setQueryStringValue(key, tab, history, location, setActiveValue)}
    >
      {tabsData?.length > 0
        && formatedTabs?.map((item) => {
          const { title, id, count } = item;

          return (
            <NavItem key={id} eventKey={id} title={title}>
              <span>{t(`Tabs.${title.trim()}`)}</span>
              {!!count && Number(count) > 0 && (
                <Badge className={title === 'Error' || title === 'Fail' ? 'badge-error' : ''}>{count}</Badge>
              )}
            </NavItem>
          );
        })}
    </Nav>
  );
};

Tabs.defaultProps = {
  tab: 'status',
  tabsData: [],
};

Tabs.propTypes = {
  tab: PropTypes.string,
  tabsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired | PropTypes.string.isRequired,
    }),
  ),
  forAwaitingRaplace: PropTypes.bool,
};

export default Tabs;
