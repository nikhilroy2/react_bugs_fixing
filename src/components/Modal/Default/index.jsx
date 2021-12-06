import './_modal.scss';
import './_modal.dark-mode.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import Spinner from '../../Loaders/Spinner';
import Popover from '../../Popover';

const ModalComponent = ({ children, bsSize }) => {
  const {
    modalText,
    open,
    toggle,
    showCloseButton,
    isFetching,
    formRef,
    isDisabled,
    modalHoverLoader,
    forAddRates,
    forEditUser,
    clearValue,
    isData,
    ratesValues,
    className,
    hideSubmitBtn,
    forNativeForm,
    ratesFetching,
    hideFooter,
  } = children.props;

  const [openPop, setOpen] = useState(false);
  const togglePop = () => setOpen(!openPop);

  return (
    <Modal
      show={open}
      bsSize={bsSize}
      onHide={() => {
        toggle();
      }}
      backdrop="static"
      className={className}
    >
      {forAddRates && modalHoverLoader && <div className="modal-loader-small" />}
      {forEditUser && ratesFetching && <div className="modal-loader-small" />}
      {modalText.title && (
        <Modal.Header closeButton={showCloseButton}>
          <Modal.Title>{modalText.title}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>{children}</Modal.Body>

      {!hideFooter && (
        <Modal.Footer className="customModalFooter">
          {!hideSubmitBtn && (
          <Button
            bsStyle="primary"
            type="submit"
            form={forNativeForm ? 'form-orders' : null}
            onClick={(...args) => (forNativeForm ? null : formRef.current.handleSubmit(...args))}
            disabled={isFetching || isDisabled || isData}
          >
            {isFetching && <Spinner />}
            <span>{modalText.okBtnText}</span>
          </Button>
          )}

          {modalText.cancelBtnText && (
          <Button
            onClick={() => {
              toggle();
            }}
          >
            {modalText.cancelBtnText}
          </Button>
          )}

          {modalText.deleteBtnText && (
          <div className="pull-right" style={{ position: 'relative' }}>
            <Button
              disabled={isData || ratesValues.length === 0}
              bsStyle="link"
              className="modal-delete-btn"
              onClick={togglePop}
            >
              {modalText.deleteBtnText}
            </Button>
            <Popover
              clearValue={clearValue}
              openPop={openPop}
              setOpen={setOpen}
              togglePop={togglePop}
            />
          </div>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

ModalComponent.propTypes = {
  bsSize: PropTypes.string,
  children: PropTypes.element.isRequired,
  hideFooter: PropTypes.bool,
};

export default ModalComponent;
