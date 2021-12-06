import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';

import InputGenerate from '../../../../components/Inputs/Generate';
import FormikInput from '../../../../components/Inputs/FormikInput';
import { onSetUserPassword } from '../../../../redux/actions/users/actions';
import Alert from '../../../../components/Alert';
import FormComponent from '../../../../components/Form';

const SetPasswordForm = ({
  user, formRef, toggle, passwordDisabled,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(onSetUserPassword(user.id, values.password))
      toggle();
    } catch (error) {
      actions.setErrors(error);
    }
  };

  return (
    <Formik
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      initialValues={{ username: user.username, password: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      innerRef={formRef}
    >
      {({ errors, handleSubmit, setFieldValue }) => (
        <>
          {errors.length && <Alert text={errors} />}
          <FormComponent
            handleSubmit={handleSubmit}
          >
            <Field
              component={FormikInput}
              label="Username"
              name="username"
              disabled
            />
            <Field
              disabled={passwordDisabled}
              component={InputGenerate}
              setFieldValue={setFieldValue}
              withTooltip
              tooltipText="Generate<br /> password"
              label="Password"
              name="password"
              genName="password"
            />
          </FormComponent>
        </>
      )}
    </Formik>
  )
}

SetPasswordForm.propTypes = {
  user: PropTypes.object,
  formRef: PropTypes.object,
  username: PropTypes.string,
  toggle: PropTypes.func,
  passwordDisabled: PropTypes.bool,
};

export default SetPasswordForm;
