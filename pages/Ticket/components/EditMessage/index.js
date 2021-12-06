import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';

import FormikInput from '../../../../components/Inputs/FormikInput';
import Alert from '../../../../components/Alert';
import { changeTicketMessageAction } from '../../../../redux/actions/tickets';
import { moveCaret } from '../../helpers';

const EditMessageForm = ({
  toggle, formRef, messageID, ticketID, defaultValue,
}) => {
  const dispatch = useDispatch();

  const formatValue = defaultValue
    .replace(/<br\s?\/?>/g, '\r')
    .replace(/&quot;/gi, '"')
    .replace(/&gt;/gi, '>')
    .replace(/&lt;/gi, '<')
    .replace(/&amp;/gi, '&')
    .replace(/&apos;/gi, '"');

  const handleSubmit = async (values, setErrors) => {
    try {
      await dispatch(changeTicketMessageAction(messageID, values.message, ticketID));
      toggle();
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <Formik
      innerRef={formRef}
      initialValues={{ message: formatValue }}
      onSubmit={(values, actions) => {
        handleSubmit(values, actions.setErrors);
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, handleSubmit, handleChange }) => (
        <>
          {errors.length && <Alert text={errors} />}
          <Form onSubmit={handleSubmit} className="editMessageForm">
            <Field
              component={FormikInput}
              label="Message"
              class="textarea"
              rows={7}
              onChange={handleChange}
              el={{
                id: '',
                label: 'Message',
                key: 'message',
                max: 3000,
              }}
              name="message"
              resize={false}
              focus
              onFocus={moveCaret}
            />
          </Form>
        </>
      )}
    </Formik>
  );
};

EditMessageForm.propTypes = {
  toggle: PropTypes.func,
  formRef: PropTypes.object,
  messageID: PropTypes.number,
  ticketID: PropTypes.number,
  defaultValue: PropTypes.string,
};

EditMessageForm.defaultValue = {
  defaultValue: '',
};

export default EditMessageForm;
