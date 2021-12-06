import './_confirm.scss';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Spinner from '../../Loaders/Spinner';

const ConfirmModal = ({
  toggle, isOpen, onSubmitConfirm, title, submitStyle, extended, fetching,
}) => (
  <Modal
    show={isOpen}
    onHide={toggle}
    backdrop="static"
    className={`modal-yesno ${extended ? 'extended-yesno' : ''}`}
  >
    <Modal.Body>
      <div className="m-b text-center text-center">
        <h4 className="m-t-0">{title}</h4>
      </div>
      <div className="text-center">
        <Button
          bsStyle={submitStyle}
          className="confirm-btn-yes"
          onClick={onSubmitConfirm}
          disabled={fetching}
          type="button"
        >
          {fetching && <Spinner />}
          <span>Yes</span>
        </Button>
        <Button onClick={toggle}>No</Button>
      </div>
    </Modal.Body>
  </Modal>
);

ConfirmModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  onSubmitConfirm: PropTypes.func,
  extended: PropTypes.bool,
  fetching: PropTypes.bool,
  title: PropTypes.string,
  submitStyle: PropTypes.string,
};
ConfirmModal.defaultProps = {
  title: 'Are you sure?',
  submitStyle: 'primary',
};

export default ConfirmModal;
