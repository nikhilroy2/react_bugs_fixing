import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Modal, FormControl, ControlLabel, FormGroup,
} from 'react-bootstrap';

const DetailsModal = ({
  isOpen,
  toggleModal,
  title,
  actionFetching,
  detailsData,
  id,
  submitAction,
  clearStateAction,
  submitBtnText,
}) => {
  const dispatch = useDispatch();

  const onSubmitResend = () => {
    if (submitAction) {
      dispatch(submitAction(id));
      toggleModal();
    }
  };

  return (
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
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {detailsData?.map((detail, index) => (
          <FormGroup key={index}>
            {detail.label && <ControlLabel>{detail.label}</ControlLabel>}
            <FormControl rows={7} componentClass={detail.type} name={detail.name} readOnly value={detail.value} />
          </FormGroup>
        ))}
      </Modal.Body>

      <Modal.Footer className="customModalFooter">
        {submitAction && submitBtnText && (
          <Button className="btn btn-primary" onClick={() => onSubmitResend()}>
            {submitBtnText}
          </Button>
        )}
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
};

DetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  actionFetching: PropTypes.bool,
  detailsData: PropTypes.array,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  submitAction: PropTypes.func,
  clearStateAction: PropTypes.func,
  submitBtnText: PropTypes.string,
};

export default DetailsModal;
