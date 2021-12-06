import './_copyRatesForm.scss';
import './_copyRatesForm.dark-mode.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

import FormikInput from '../../../../components/Inputs/FormikInput';
import SearchSelect from '../../../../components/Select/SearchSelect';
import FormikForm from '../../../../components/Form';
import Alert from '../../../../components/Alert';

import { onCopyCustomRates, getUsersCustomRates } from '../../../../redux/actions/users/actions';
import { parseValues } from './helpers';

const CopyRatesForm = ({
  setUser, toggle, user, formRef, isDisabled, setSelected,
}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState({ title: 'Select user' });
  const users = useSelector((state) => state.users.usersCustomRates);

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(onCopyCustomRates(values.from_user, user.id));
      toggle();
    } catch (error) {
      actions.setErrors(error);
    }
  }

  const handleSelectRates = (value, setFieldValue, setActive) => {
    setActive(value);
    setSelected(false);
    setFieldValue('from_user', value.id);
  }

  useEffect(() => {
    setSelected(true);
    dispatch(getUsersCustomRates());
  }, [dispatch, setSelected]);

  return (
    <Formik
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      initialValues={{ to_user: `${user.username} (${user.custom_rates})`, from_user: 0 }}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      innerRef={formRef}
    >
      {({ errors, handleSubmit, setFieldValue }) => (
        <>
          {errors.length && <Alert text={errors} />}
          <FormikForm handleSubmit={handleSubmit} className="copyRatesForm" disableKeyUp>
            <Row>
              <Col xs={12} md={6} className="copyRates__fromCol">
                <Field
                  onSelectRates={(value) => handleSelectRates(value, setFieldValue, setActive, setUser)}
                  className={`copyRates__fromInput ${isDisabled && 'notSelected'}`}
                  toggleBtnTitle={active.title}
                  options={parseValues(users)}
                  selectTitle="Select user"
                  headerSelectText="Select user"
                  component={SearchSelect}
                  label="From user"
                  forCustomRates
                  name="from_user"
                  closeOnEnter
                />
                <i className="far fa-long-arrow-right copyRates__arrow" />
              </Col>
              <Col xs={12} md={6}>
                <Field
                  className="copyRates__toInput"
                  component={FormikInput}
                  label="To user"
                  name="to_user"
                  disabled
                />
              </Col>
            </Row>
          </FormikForm>
        </>
      )}
    </Formik>
  )
}

CopyRatesForm.propTypes = {
  setUser: PropTypes.func,
  toggle: PropTypes.func,
  user: PropTypes.object,
  formRef: PropTypes.object,
  isDisabled: PropTypes.bool,
  setSelected: PropTypes.func,
}

export default CopyRatesForm;
