import './_ticket.scss';
import './_ticket.dark-mode.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Panel, Row, Col, ListGroup, Grid, Badge, Button } from 'react-bootstrap';
import qs from 'qs';

import NotFound from '../404';
import Message from './components/Message';
import TicketBody from './components/TicketBody';
import Confirm from '../../components/Modal/Confirm';
import Modal from '../../components/Modal/Default';
import EditMessageForm from './components/EditMessage';
import { getTicketViewSelector } from '../../redux/selectors/tickets';
import {
  getTicketView, clearTicketView, setActiveTicketForView, getTicketsConfigAction,
} from '../../redux/actions/tickets';

const TicketsDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const queryString = qs.parse(location.search.slice(1));
  const [error, setError] = useState('');
  const [open, setOpen] = useState([false, false]);
  const toggleConfirm = () => setOpen((prev) => [!prev[0], prev[1]]);
  const toggleModal = () => setOpen((prev) => [prev[0], !prev[1]]);

  const [messageID, setMessageID] = useState(-1);

  const { notFound, errorData } = useSelector((state) => state.redirect);
  const view = useSelector((state) => getTicketViewSelector(state));
  const { messages, title, id, locked, access, isFetching } = view;

  const [modalSetting, setSettings] = useState({
    title: '',
    submit: () => {},
    submitStyle: 'primary',
    extended: false,
  });

  const formRef = useRef(null);
  const [defaultMessage, setDefaultMessage] = useState('');

  const fetching = useSelector((state) => state.tickets.deleteFetching);

  useEffect(() => {
    dispatch(getTicketView(queryString.id));
    dispatch(setActiveTicketForView(queryString.id));
    dispatch(getTicketsConfigAction());

    return () => {
      dispatch(clearTicketView());
    };
  }, [queryString.id, dispatch]);

  useEffect(() => {
    document.title = `Ticket ${id || ''}`;
  }, [location.search, id]);

  if (notFound) {
    return (
      <NotFound
        errorDataMessage={errorData?.data}
        errorStatus={errorData?.status}
        errorStatusText={errorData?.statusText}
      />
    );
  }

  return (
    <>
      <Modal>
        <EditMessageForm
          open={open[1]}
          toggle={toggleModal}
          modalText={{
            title: 'Edit message',
            okBtnText: 'Save changes',
            cancelBtnText: 'Cancel',
          }}
          showCloseButton
          formRef={formRef}
          messageID={messageID}
          ticketID={id}
          defaultValue={defaultMessage}
          isFetching={fetching}
        />
      </Modal>
      <Confirm
        isOpen={open[0]}
        toggle={toggleConfirm}
        onSubmitConfirm={modalSetting.submit}
        title={modalSetting.title}
        submitStyle={modalSetting.submitStyle}
        extended={modalSetting.extended}
      />
      {isFetching ? (
        <div className="modal-loader" />
      ) : (
        <Grid fluid>
          {queryString.id && (
            <Row>
              <Col xs={12} lg={8} className="detailsCol">
                <Button
                  className="details_backButton"
                  onClick={() => {
                    history.goBack();
                  }}
                  bsStyle="link"
                >
                  <span>‹</span>
                  Back
                </Button>
                <Panel>
                  <Panel.Heading className="details__header">
                    <div className="details__header__title">{title}</div>
                    <div className="details__header__id">{`ID: ${id}`}</div>
                  </Panel.Heading>
                  <ListGroup>
                    <TicketBody id={id} globalError={error} setError={setError} setSettings={setSettings} toggle={toggleConfirm} access={access} />
                    <div className="list-group-item">
                      <Row>
                        {locked && (
                          <div className="text-center m-b">
                            <Badge className="details__locked">
                              <span className="fas fa-lock" />
                              Ticket is locked now and user not able to reply
                            </Badge>
                          </div>
                        )}
                        {messages?.map((el, i) => (
                          <Message
                            ticketID={id}
                            key={i}
                            setModalSettings={setSettings}
                            toggle={toggleConfirm}
                            readStatus={el?.is_unread}
                            setError={setError}
                            info={el}
                            toggleModal={toggleModal}
                            setMessageID={setMessageID}
                            setDefaultMessage={(message) => setDefaultMessage(message)}
                          />
                        ))}
                      </Row>
                    </div>
                  </ListGroup>
                </Panel>
              </Col>
            </Row>
          )}
        </Grid>
      )}
    </>
  );
};

export default TicketsDetails;
