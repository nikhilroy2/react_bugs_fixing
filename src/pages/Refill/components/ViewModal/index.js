import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, FormControl, ControlLabel, FormGroup,
} from 'react-bootstrap';

const ViewModal = ({
  isOpen, toggleModal, actionFetching, clearStateAction, item,
}) => (
  <Modal
    show={isOpen}
    onHide={() => {
      toggleModal();
    }}
    onExited={() => clearStateAction && clearStateAction()}
    backdrop="static"
  >
    {actionFetching && <div className="modal-loader-small" />}
    <Modal.Header closeButton>
      <Modal.Title>Details</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <FormGroup>
        {item?.provider && <ControlLabel>{item?.provider}</ControlLabel>}
        <FormControl rows={7} componentClass="textarea" readOnly defaultValue={item?.response} />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Last update</ControlLabel>
        <FormControl componentClass="input" readOnly defaultValue={item?.updated_at} />
      </FormGroup>
    </Modal.Body>

    <Modal.Footer className="customModalFooter">
      <Button
        onClick={() => {
          toggleModal();
        }}
      >
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

ViewModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  actionFetching: PropTypes.bool,
  clearStateAction: PropTypes.func,
  item: PropTypes.object,
};

export default ViewModal;
