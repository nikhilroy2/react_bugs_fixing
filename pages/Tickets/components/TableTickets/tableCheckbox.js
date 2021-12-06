/* import/no-extraneous-dependencies: off */
import React from 'react';
import PropTypes from 'prop-types';

const TableCheckbox = ({
  item, index, config, values, onChangeCheck,
}) => (
  <td key={index}>
    {config?.mass_actions && (
      <input
        className="tickets__check"
        type="checkbox"
        disabled={item.status === 4}
        onChange={(e) => onChangeCheck(e, item)}
        checked={values?.includes(item.id)}
        value={values}
      />
    )}
  </td>
);

TableCheckbox.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  config: PropTypes.object,
  values: PropTypes.array,
  onChangeCheck: PropTypes.func,
}

export default TableCheckbox;
