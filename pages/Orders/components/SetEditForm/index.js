import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormControl, ControlLabel, FormGroup } from 'react-bootstrap';

import Alert from '../../../../components/Alert';

const SetEditForm = ({
  name, handleSubmit, setModalSettings, modalSettings, setErrorText, errorText,
}) => {
  let refInput = useRef(null);

  useEffect(() => {
    refInput.focus();

    return () => {
      setErrorText('');
    };
  }, [setErrorText]);

  const onChange = (e) => {
    if (modalSettings.name !== 'link') {
      if (!e.target.value) {
        setErrorText('');
      } else if (!/^-?\d*\.?\d+$/g.test(e.target.value) || e.target.value.length > 9) {
        setErrorText('Invalid format');
      } else if (/^-?\d*\.?\d+$/g.test(e.target.value) || e.target.value.length < 9) {
        setErrorText('');
      }
    }

    setModalSettings({
      ...modalSettings,
      initValue: {
        [name]: e.target.value,
      },
    });
  };

  return (
    <form onSubmit={(e) => (!errorText ? handleSubmit(e) : e.preventDefault())} id="form-orders">
      {errorText && <Alert text={errorText} />}
      <FormGroup>
        <ControlLabel>{modalSettings.inputLabel}</ControlLabel>
        <FormControl
          type={modalSettings.type}
          value={modalSettings.initValue[name] || ''}
          name={modalSettings.name}
          onChange={onChange}
          required
          max={modalSettings.max || null}
          inputRef={(ref) => {
            refInput = ref;
          }}
        />
      </FormGroup>
    </form>
  );
};

SetEditForm.propTypes = {
  handleSubmit: PropTypes.func,
  modalSettings: PropTypes.object,
  setModalSettings: PropTypes.func,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  setErrorText: PropTypes.func,
  errorText: PropTypes.string,
};

export default SetEditForm;
