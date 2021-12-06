/* eslint react/no-danger: off */
import './_alert.scss';
import './_alert.dark-mode.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const AlertComponent = ({ text, type, dismiss }) => {
  const [show, setShow] = useState(true);
  const handleDismiss = () => setShow(!show);

  if (show) {
    return (
      <Alert className="customAlertcomponent" bsStyle={type} onDismiss={dismiss && handleDismiss}>
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </Alert>
    );
  }
  return null;
};
AlertComponent.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  dismiss: PropTypes.bool,
};
AlertComponent.defaultProps = {
  type: 'danger',
};

export default AlertComponent;
