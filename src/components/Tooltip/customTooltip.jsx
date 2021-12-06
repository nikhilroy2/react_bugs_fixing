/* eslint react/no-danger: off */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const CustomTooltip = ({ show, tooltipText, placement }) => (
  <CSSTransition in={show} timeout={150} classNames="popover" unmountOnExit>
    <div className={`app-popover ${placement}`}>
      <div className="app-tooltip-arrow" />
      <div className="app-tooltip-inner" dangerouslySetInnerHTML={{ __html: tooltipText }} />
    </div>
  </CSSTransition>
);

CustomTooltip.propTypes = {
  show: PropTypes.bool,
  tooltipText: PropTypes.string,
  placement: PropTypes.string,
};

export default CustomTooltip;
