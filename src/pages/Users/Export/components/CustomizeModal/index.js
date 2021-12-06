import './_customize.scss';
import './_customize.dark-mode.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ListGroupItem, ListGroup, Checkbox, Modal, Button,
} from 'react-bootstrap';

const CustomizeModal = ({
  items, toggle, include, setInclude, open, className,
}) => {
  const [customCheckbox, setCustomCheckbox] = useState(include);

  const handleSubmit = () => setInclude(customCheckbox);

  const handleChange = (e, value) => {
    if (e.target.checked) {
      setCustomCheckbox([...customCheckbox, value]);
    } else {
      setCustomCheckbox([...customCheckbox.filter((item) => item.id !== value.id)]);
    }
  };

  useEffect(() => {
    setCustomCheckbox(include);
  }, [include]);

  return (
    <Modal
      show={open}
      onHide={() => {
        toggle();
        setCustomCheckbox(include);
      }}
      backdrop="static"
      className={className}
    >
      <Modal.Body>
        <button
          onClick={() => {
            toggle();
            setCustomCheckbox(include);
          }}
          type="button"
          className="close customizeClose"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>

        <h2 className="customizeTitle">Customize columns</h2>
        <p className="m-b">Select the columns that you want to include in your file</p>

        <ListGroup className="customize__list">
          {items?.map((el) => (
            <ListGroupItem className="customize__li" key={el.id}>
              
              <Checkbox
                onChange={(e) => handleChange(e, el)}
                checked={!!customCheckbox?.find((elem) => elem.id === el.id)}
                className="customize__checkbox"
              >
                {el.title}
              </Checkbox>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer className="customModalFooter">
        <Button
          bsStyle="primary"
          onClick={() => {
            handleSubmit();
            toggle();
          }}
        >
          <span>Save changes</span>
        </Button>

        <Button
          onClick={() => {
            toggle();
            setCustomCheckbox(include);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CustomizeModal.propTypes = {
  items: PropTypes.array,
  toggle: PropTypes.func,
  include: PropTypes.array,
  setInclude: PropTypes.func,
  open: PropTypes.bool,
  className: PropTypes.string,
};

export default CustomizeModal;
