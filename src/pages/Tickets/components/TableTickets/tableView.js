import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TableView = ({ item, index, config, elem }) => (
  <td key={index} className="tickets__subject">
    {config?.view_ticket ? (
      <Link to={`/admin/tickets/view?id=${item.id}`} className={item.unread ? 'tickets__unread' : ''}>
        {elem}
      </Link>
    ) : (
      <span className={item.unread ? 'tickets__unread' : ''}>{elem}</span>
    )}
  </td>
);

TableView.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  config: PropTypes.object,
  elem: PropTypes.string,
};

export default TableView;
