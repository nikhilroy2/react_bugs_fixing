import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

const FormikCheckbox = ({
  setFieldValue,
  className,
  readOnly,
  disabled,
  values,
  field,
  label,
  form,
  name,
  ...props
}) => {
  const [ID] = useState(`${label}${Math.random()}`);

  return (
    <div className="checkboxWrapper">
      <Checkbox
        readOnly={readOnly}
        disabled={disabled}
        id={ID}
        checked={false}
        onChange={() => {}}
        {...props}
        className={className}
      />
      {label && <label className={className} htmlFor={ID}>{label}</label>}
    </div>

  )
}

FormikCheckbox.propTypes = {
  setFieldValue: PropTypes.func,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  values: PropTypes.object,
  field: PropTypes.object,
  form: PropTypes.object,
  name: PropTypes.string,
  props: PropTypes.object,
  label: PropTypes.string.isRequired,
}

export default FormikCheckbox;
