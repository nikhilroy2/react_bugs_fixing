import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const FormikInput = ({
  field,
  label,
  class: componentClass,
  focus,
  rows,
  id,
  disabled,
  className,
  onFocus,
  autoComplete,
  ref,
  inputRef,
  placeholder,
  onClick,
  onChange,
  onBlur,
  readOnly,
  required,
}) => (
  <FormGroup>
    {label && <ControlLabel>{label}</ControlLabel>}
    <FormControl
      {...field}
      value={field.value || ''}
      ref={ref}
      rows={rows}
      inputRef={inputRef}
      componentClass={componentClass}
      autoFocus={focus}
      disabled={disabled}
      className={className}
      placeholder={placeholder}
      onFocus={onFocus}
      onClick={onClick}
      autoComplete={autoComplete}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      readOnly={readOnly}
      required={required}
    />
  </FormGroup>
);

FormikInput.propTypes = {
  field: PropTypes.object,
  label: PropTypes.string,
  focus: PropTypes.bool,
  rows: PropTypes.number,
  class: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  autoComplete: PropTypes.string,
  ref: PropTypes.object,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

export default FormikInput;
