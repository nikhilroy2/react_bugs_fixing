import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { getKeyEvent } from './helpers';

const FormComponent = ({
  handleSubmit, children, className, disableKeyUp,
}) => (
  <Form
    className={className}
    onSubmit={handleSubmit}
    onKeyUp={(e) => { if (!disableKeyUp) getKeyEvent(e, handleSubmit); }}
  >
    {children}
  </Form>
);

FormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  disableKeyUp: PropTypes.bool,
};

export default FormComponent;
