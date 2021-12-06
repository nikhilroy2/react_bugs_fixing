import './_input.scss';
import './_input.dark-mode.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, ControlLabel, FormControl, Glyphicon } from 'react-bootstrap';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRandom } from '@fortawesome/free-solid-svg-icons';

import CustomTooltip from '../../Tooltip/customTooltip';

import { generatePassword } from './helpers';

const InputComponent = ({
  el,
  label,
  genAction,
  disabled,
  InputClassName,
  setFieldValue,
  field,
  genName,
  disableButton,
  withTooltip,
  tooltipText,
  autoComplete,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onMouseEnter = () => setShowTooltip(true);
  const onMouseLeave = () => setShowTooltip(false);

  return (
    <FormGroup className="inputGenerateGroup">
      {label && <ControlLabel>{label}</ControlLabel>}

      <InputGroup>
        <FormControl className={`inputGenerate__input ${InputClassName}`} disabled={disabled} {...field} el={el} autoComplete={autoComplete} />
        {withTooltip ? (
          <InputGroup.Addon
            disabled={disableButton}
            className={`${disableButton ? 'disabledButton' : ''}`}
            onClick={async () => {
              if (!disableButton) {
                setFieldValue(genName, await genAction());
              }
            }}
          >
            <Glyphicon onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} glyph="random" />
            <CustomTooltip placement="bottom" show={showTooltip} tooltipText={tooltipText} />
          </InputGroup.Addon>
        ) : (
          <InputGroup.Addon
            disabled={disableButton}
            className={`${disableButton ? 'disabledButton' : ''}`}
            onClick={async () => {
              if (!disableButton) {
                setFieldValue(genName, await genAction());
              }
            }}
          >
            <Glyphicon glyph="random" />
          </InputGroup.Addon>
        )}
      </InputGroup>
    </FormGroup>
  );
};

InputComponent.propTypes = {
  el: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  label: PropTypes.string,
  genAction: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  InputClassName: PropTypes.string,
  setFieldValue: PropTypes.func,
  field: PropTypes.object,
  genName: PropTypes.string,
  disableButton: PropTypes.bool,
  withTooltip: PropTypes.bool,
  tooltipText: PropTypes.string,
  autoComplete: PropTypes.string,
};

InputComponent.defaultProps = {
  genAction: generatePassword,
};

export default InputComponent;
