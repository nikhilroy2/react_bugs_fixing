/* eslint react/no-danger: off */
import './_message.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Well, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../../../redux/actions/tickets';

const Message = ({ setError, info, setModalSettings, toggleModal, readStatus, ticketID, toggle, setMessageID, setDefaultMessage }) => {
  const dispatch = useDispatch();
  const { username, created, message, is_admin, access, id } = info;

  const deleteMessageFunc = async (id) => {
    try {
      await dispatch(deleteMessage(id, ticketID));
      setError(false);
      toggle();
    } catch (error) {
      setError(error);
      toggle();
    }
  };

  return (
    <div className={`ticketMessage ${is_admin ? 'my' : 'notMy'}`}>
      <div className="ticketMessage__head">
        <strong>{username}</strong>
        <div>
          <p className="ticketMessage__head__date">{created}</p>
        </div>
      </div>
      <div className={`ticketMessage__body ${is_admin ? 'self' : 'notSelf'}`}>
        <Well
          className={`ticketMessage__body__message 
                                ${is_admin ? 'ticketMessage__body__message_green' : 'ticketMessage__body__message_blue'}`}
          bsSize="sm"
        >
          <div className="ticketMessage_body_messageText" dangerouslySetInnerHTML={{ __html: message }} />
        </Well>
      </div>
      {is_admin && (access.delete || access.edit || readStatus) ? (
        <Row className="ticketMessage__footer">
          <Col xs={12}>
            <ButtonGroup>
              {!!access.edit && (
                <Button
                  bsStyle="link"
                  bsSize="xsmall"
                  onClick={() => {
                    setDefaultMessage(message);
                    setMessageID(id);
                    toggleModal();
                  }}
                >
                  Edit
                </Button>
              )}

              {!!access.delete && !!access.edit && <span className="ticketMessage__footer__dot" />}

              {!!access.delete && (
                <Button
                  bsStyle="link"
                  bsSize="xsmall"
                  className={`ticketMessage__footer__link ${!!access.delete && !!access.edit ? 'ticketMessage__footer__link__edit' : ''}`}
                  onClick={() => {
                    setModalSettings({
                      title: 'Delete message?',
                      submit: () => deleteMessageFunc(id),
                      submitStyle: 'primary',
                      extended: true,
                    });
                    toggle();
                  }}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
            <p className="ticketMessage__footer__status">{readStatus ? 'Message unread' : ''}</p>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

Message.propTypes = {
  setError: PropTypes.func,
  info: PropTypes.object,
  setModalSettings: PropTypes.func,
  toggleModal: PropTypes.func,
  readStatus: PropTypes.bool,
  ticketID: PropTypes.number,
  toggle: PropTypes.func,
  setMessageID: PropTypes.func,
  setDefaultMessage: PropTypes.func,
};

export default Message;
