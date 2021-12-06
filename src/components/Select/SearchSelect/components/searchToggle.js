/* eslint react/no-unused-prop-types: "off" */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const SearchToggle = forwardRef(({
  children, onClick, bsClass, forCustomRates,
}, ref) => (
  <Button
    ref={ref}
    onClick={(e) => onClick(e)}
    className={`${bsClass} custom-button`}
  >
    <span className="filter-options">{children}</span>
    {!forCustomRates && <span className="caret caret-filter" />}
  </Button>
));

SearchToggle.propTypes = {
  ref: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  children: PropTypes.node,
  onClick: PropTypes.func,
  bsClass: PropTypes.string,
  forCustomRates: PropTypes.bool,
}

export default SearchToggle;
