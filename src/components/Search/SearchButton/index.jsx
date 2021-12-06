import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const SearchButton = ({ onClickButton, buttonText }) => (buttonText ? (
  <li className="pull-right nav-tabs__unread">
    <Button bsStyle="link" onClick={onClickButton}>
      {buttonText}
    </Button>
  </li>
) : null);

SearchButton.propTypes = {
  buttonText: PropTypes.string,
  onClickButton: PropTypes.func,
}

export default SearchButton;
