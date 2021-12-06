import './_userForm.scss';
import './_userForm.dark-mode.scss';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ControlLabel } from 'react-bootstrap';
import { Formik, Field } from 'formik';

import FormikInput from '../../../../components/Inputs/FormikInput';
import GenerateInput from '../../../../components/Inputs/Generate';
import FormComponent from '../../../../components/Form';
import Alert from '../../../../components/Alert';
import Checkbox from '../../../../components/Checkbox/FormikCheckbox';

import { onCreateUserAction, onUpdateUserDataAction, onClearUserData } from '../../../../redux/actions/users/actions';
import {
  getFormGroupsArray, checkIsChecked, handleChangeChechboxes, parseValues, emptyValues,
} from './helpers';
import { generatePassword } from '../../../../components/Inputs/Generate/helpers';

const UserForm = ({
  formRef, mode, toggle, user, ratesFetching, fields, userData, configCopy,
}) => {
  const dispatch = useDispatch();
  let ref = useRef(null);
  const initial = mode
    ? {
      usersUsername: userData.username,
      usersEmail: userData.email,
      usersSkype: userData.skype,
      usersFirst_name: userData.first_name,
      usersLast_name: userData.last_name,
      cpf_value: userData.cpf,
      usersPassword: userData.password,
      usersPayment_methods: userData.payment_methods,
    }
    : emptyValues;

  const handleSubmit = async (values, actions) => {
    const filterMethods = [...new Set(values.payment_methods)];
    values.payment_methods = filterMethods;

    try {
      if (!mode) {
        await dispatch(onCreateUserAction(values));
      } else {
        await dispatch(onUpdateUserDataAction(user.id, values));
      }

      toggle();
    } catch (error) {
      actions.setErrors(error);
    }
  };

  useEffect(() => () => dispatch(onClearUserData()), [dispatch, mode, user.id]);

  useEffect(() => {
    if (ref && ref.focus) ref.focus();
  }, [userData]);

  return (
    <>
      <Formik
        onSubmit={(values, actions) => handleSubmit(parseValues(values), actions)}
        enableReinitialize={mode}
        validateOnChange={false}
        validateOnBlur={false}
        innerRef={formRef}
        initialValues={{
          ...initial,
          usersParsedMethods: mode ? userData.payment_methods : configCopy.payment_methods,
        }}
      >
        {({
          errors, values, handleSubmit, setFieldValue, handleChange,
        }) => (
          <>
            {errors.length && <Alert text={errors} />}
            <FormComponent handleSubmit={handleSubmit} className="userForm">
              {!ratesFetching
                  && getFormGroupsArray(mode, fields).map((el, index) => {
                    if (el === false) {
                      return null;
                    }

                    if (!el.payment) {
                      return (
                        <Field
                          genAction={!mode ? generatePassword : null}
                          component={el.generate ? GenerateInput : FormikInput}
                          setFieldValue={setFieldValue}
                          genName={el.key}
                          name={el.key}
                          id={el.key}
                          key={index}
                          onChange={handleChange}
                          {...el}
                          autoComplete={el.key === 'usersPassword' ? 'new-password' : 'on'}
                          focus={!index}
                          inputRef={el.needRef ? (el) => (ref = el) : null}
                          disabled={el.generate && mode}
                          disableButton={userData.keyFetching}
                          withTooltip={el.key === 'usersApikey' || el.key === 'usersPassword'}
                          tooltipText={el.tooltipText}
                          tooltipClass="userFormTooltip"
                        />
                      );
                    }
                    return (
                      <div key={index}>
                        <ControlLabel className="paymentLabel">Allowed payment methods</ControlLabel>
                        <div className="userFormPayments">
                          {values.usersParsedMethods?.map((item, index) => {
                            const checked = checkIsChecked(item, values);

                            return (
                              <Field
                                setFieldValue={setFieldValue}
                                component={Checkbox}
                                checked={checked}
                                onClick={() => handleChangeChechboxes(item, values, setFieldValue)}
                                label={item.name}
                                values={values}
                                name="usersParsedMethods"
                                key={index}
                                className={!item.visibility ? 'checkboxInvisible' : ''}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
            </FormComponent>
          </>
        )}
      </Formik>
    </>
  );
};

UserForm.propTypes = {
  formRef: PropTypes.object,
  toggle: PropTypes.func,
  user: PropTypes.object,
  userData: PropTypes.object,
  configCopy: PropTypes.object,
  initialValues: PropTypes.object,
  mode: PropTypes.oneOf([1, 0, true, false]),
  ratesFetching: PropTypes.bool,
  fields: PropTypes.object,
};

export default UserForm;
