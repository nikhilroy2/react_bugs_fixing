import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

import Alert from '../../../../components/Alert';
import FormComponent from '../../../../components/Form';
import { sendMessageFunc, closeTicketFunc } from '../../helpers';
import FormControlButtons from './formControlButtons';
import FormikInput from '../../../../components/Inputs/FormikInput';

const TicketBody = ({
  setError, globalError, id, toggle, setSettings, access,
}) => {
  const formRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const isFetching = useSelector((state) => state.tickets.replyFetching);

  const backToTickets = () => {
    history.push('/admin/tickets');
  };

  const handleClose = (status) => {
    setSettings({
      title: status ? 'Close and lock ticket?' : 'Close ticket?',
      submitStyle: 'primary',
      submit: () => closeTicketFunc(dispatch, status, id, setError, toggle),
      extended: false,
    });
    toggle();
  };

  const handleSubmit = async (values, actions) => {
    setError('');
  
    try {
      actions.resetForm();
      await sendMessageFunc(dispatch, id, values.message);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="list-group-item">
      <Row>
        <Col xs={12}>
          {access?.submit_message && (
            <Formik
              innerRef={formRef}
              initialValues={{ message: '' }}
              onSubmit={(values, actions) => {
                handleSubmit(values, actions);
              }}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ handleSubmit, handleChange }) => (
                <>
                  {!!globalError.length && <Alert text={globalError} />}
                  <FormComponent className="details_form" onSubmit={handleSubmit}>
                    <Field
                      component={FormikInput}
                      onChange={handleChange}
                      className="details__textarea"
                      name="message"
                      class="textarea"
                      rows={5}
                    />
                  </FormComponent>
                </>
              )}
            </Formik>
          )}
        </Col>

        {access?.show_buttons && (
          <FormControlButtons
            formRef={formRef}
            isFetching={isFetching}
            handleClose={handleClose}
            id={id}
            setSettings={setSettings}
            backToTickets={backToTickets}
            setError={setError}
            toggle={toggle}
            access={access}
          />
        )}
      </Row>
    </div>
  );
};

TicketBody.propTypes = {
  setError: PropTypes.func,
  globalError: PropTypes.any,
  id: PropTypes.number,
  toggle: PropTypes.func,
  setSettings: PropTypes.func,
  access: PropTypes.object,
};

export default TicketBody;
