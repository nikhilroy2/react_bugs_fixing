import './_tooltip.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const TicketPopover = (text, tooltipClass) => (
  <Popover id="popover-trigger-hover-focus-custom" className={`text-center ${tooltipClass}`}>
    {text}
  </Popover>
);

const Tooltip = ({ children, trigger, placement, text, tooltipClass }) => (
  <OverlayTrigger trigger={trigger} placement={placement} overlay={TicketPopover(text, tooltipClass)}>
    {children}
  </OverlayTrigger>
);

Tooltip.propTypes = {
  children: PropTypes.node,
  trigger: PropTypes.array,
  placement: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  tooltipClass: PropTypes.string,
};

Tooltip.defaultProps = {
  placement: 'bottom',
  trigger: ['hover', 'focus'],
};

export default Tooltip;
