import './_popover.scss';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const PopoverCustom = ({
  clearValue, openPop, setOpen, togglePop,
}) => {
  const handleClickOutside = (e) => {
    if (!e.target.closest('.modal-delete-btn') && !openPop) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="custom-popover-id" className={`custom-popover fade ${openPop ? 'in' : ''}`} style={{ display: openPop ? 'block' : 'none' }}>
      <div className="arrow" />
      <div className="popover__content">
        <Button
          onClick={() => {
            clearValue();
            togglePop();
          }}
          bsStyle="primary"
          bsSize="small"
        >
          Delete
        </Button>
        <Button onClick={() => togglePop()} bsSize="small">
          Cancel
        </Button>
      </div>
    </div>
  );
};

PopoverCustom.propTypes = {
  togglePop: PropTypes.func,
  openPop: PropTypes.bool,
  setOpen: PropTypes.func,
  clearValue: PropTypes.func,
};

export default PopoverCustom;
