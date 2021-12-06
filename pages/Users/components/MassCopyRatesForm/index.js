import './_massCopyRates.scss';
import './_massCopyRates.dark-mode.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import {
  Row, Col, ControlLabel, FormControl,
} from 'react-bootstrap';

import { getUsersCustomRates, onMassCopyRates } from '../../../../redux/actions/users/actions';
import Alert from '../../../../components/Alert';
import FormComponent from '../../../../components/Form';
import SearchSelect from '../../../../components/Select/SearchSelect';

const MassCopyRatesForm = ({
  setSelected, formRef, selectedUsers, values, toggle, setUsers, setValues, isDisabled,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersCustomRates);

  const [title, setTitle] = useState('Select user');
  const [user, setUser] = useState(0);

  const handleSelect = (el) => {
    setSelected(false);
    setUser(el.id);
    setTitle(el.title);
  };
  const handleSubmit = async (value, actions) => {
    try {
      await dispatch(onMassCopyRates(user, values));
      toggle();
      setUsers([]);
      setValues([]);
    } catch (error) {
      actions.setErrors(error);
    }
  }

  useEffect(() => {
    setSelected(true);
    dispatch(getUsersCustomRates());
  }, [dispatch, setSelected]);

  return (
    <Formik
      onSubmit={handleSubmit}
      innerRef={formRef}
      initialValues={{}}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, handleSubmit }) => (
        <>
          { errors.length && <Alert text={errors} /> }
          <FormComponent handleSubmit={handleSubmit} disableKeyUp>
            <Row>
              <Col xs={12} md={6} className={`copyRates__fromUsers ${isDisabled && 'notSelected'}`}>
                <ControlLabel>From user</ControlLabel>
                <Field
                  component={SearchSelect}
                  toggleBtnTitle={title}
                  headerSelectText="Select user"
                  forCustomRates
                  options={{
                    Hide: users?.map((el) => ({
                      id: el.id,
                      title: `${el.username} (${el.custom_rates})`,
                      rates: el.custom_rates,
                    })),
                  }}
                  onSelectRates={handleSelect}
                  closeOnEnter
                />
                <i className="far fa-long-arrow-right massCopyRates__arrow" />
              </Col>
              <Col xs={12} md={6} className="copyRates__toUsers">
                <ControlLabel>To users</ControlLabel>
                <Field
                  component={FormControl}
                  componentClass="select"
                  disabled
                  multiple
                >
                  {selectedUsers.map(({ username, custom_rates }, i) => (
                    <option key={i}>{`${username} (${custom_rates})`}</option>
                  ))}
                </Field>
              </Col>
            </Row>
          </FormComponent>
        </>
      )}
    </Formik>
  )
}

MassCopyRatesForm.propTypes = {
  setSelected: PropTypes.func,
  formRef: PropTypes.object,
  selectedUsers: PropTypes.array,
  values: PropTypes.object,
  toggle: PropTypes.func,
  setUsers: PropTypes.func,
  setValues: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default MassCopyRatesForm;
