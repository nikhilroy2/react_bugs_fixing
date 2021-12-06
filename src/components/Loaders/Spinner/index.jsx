import './_spinner.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Spinner = () => (
  <FontAwesomeIcon icon={faSpinner} className="loaders_buttonSpinner" />
)

export default Spinner;
