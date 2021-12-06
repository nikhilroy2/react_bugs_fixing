import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import { renameAndCut } from '../../../../utils/helper';

import FormikInput from '../../../../components/Inputs/FormikInput';
import Alert from '../../../../components/Alert';
import FormComponent from '../../../../components/Form';

import { addTicketAction } from '../../../../redux/actions/tickets';
import { getFormGroupsArray } from './helpers';

const AddTicket = ({ formRef, toggle, setValues }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, setErrors) => {
    try {
      await dispatch(addTicketAction(values));
      toggle();
      setValues([]);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={{ ticketsUsername: '', ticketsSubject: '', ticketsMessage: '' }}
        onSubmit={(values, actions) => {
          handleSubmit(renameAndCut(values), actions.setErrors);
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleSubmit, handleChange }) => (
          <>
            {errors.length && <Alert text={errors} />}
            <FormComponent handleSubmit={handleSubmit}>
              {getFormGroupsArray.map((el, i) => {
                const { label, id } = el;
                return (
                  <Field
                    key={i}
                    component={FormikInput}
                    label={label}
                    onChange={handleChange}
                    {...el}
                    id={`tickets${label.charAt(0)}${label.slice(1)}`}
                    name={`tickets${label.charAt(0)}${label.slice(1)}`}
                    autoComplete={id === 'addTicketMessage' ? 'off' : 'on'}
                  />
                );
              })}
            </FormComponent>
          </>
        )}
      </Formik>
    </>
  );
};

AddTicket.propTypes = {
  formRef: PropTypes.object,
  toggle: PropTypes.func,
  setValues: PropTypes.func,
};

export default AddTicket;
