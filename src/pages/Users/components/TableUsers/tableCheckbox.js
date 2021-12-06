import React from 'react';
import PropTypes from 'prop-types';

const TableCheckbox = ({
  item, index, values, onChangeCheck,
}) => (
  <td key={index}>
    <input
      className="users__check"
      type="checkbox"
      onChange={(e) => onChangeCheck(e, item)}
      checked={values?.includes(item?.id)}
      value={values}
    />
  </td>
);

TableCheckbox.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  values: PropTypes.array,
  onChangeCheck: PropTypes.func,
};

export default TableCheckbox;
