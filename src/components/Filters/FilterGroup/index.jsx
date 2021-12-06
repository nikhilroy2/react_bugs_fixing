import './_search.scss';
import React, { Children } from 'react';
import PropTypes from 'prop-types';

const FilterGroup = ({ children }) => (
  <ul className="nav nav-tabs p-b">
    {Children.toArray(children).map((child, index) => {
      if (child.type.name === 'Button' || child.type.name === 'Tabs') {
        return (
          <li key={index}>
            {child}
          </li>
        );
      }

      return child;
    })}
  </ul>
);

FilterGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default FilterGroup;
