import './_form.scss';
import './_form.dark-mode.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Col, ControlLabel, Button,
} from 'react-bootstrap';
import { Formik, Field } from 'formik';

import Alert from '../../../../../components/Alert';
import Datepicker from '../../../../../components/DatePicker';
import Select from '../../../../../components/Select/Custom';
import Dropdown from '../../../../../components/Dropdown/Default';
import FormComponent from '../../../../../components/Form';

import { parseValues, getFields } from '../../helpers';
import { onMakeExport, getExportList } from '../../../../../redux/actions/users/actions';

const Form = ({ toggle, include }) => {
  const dispatch = useDispatch();

  const config = useSelector((state) => state.users.config);
  const { statuses, export_formats } = config;

  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (values, actions) => {
    const parseValuesOnSubmit = parseValues(values, statuses, include);

    try {
      await dispatch(onMakeExport(parseValuesOnSubmit));
      await dispatch(getExportList());
      setSuccessMessage(true);
    } catch (error) {
      setSuccessMessage(false);
      actions.setErrors(error);
    }
  };

  return (
    <div className="exportForm_wrapper">
      <Row>
        <Formik
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={{
            from_date: '2018-05-28',
            to_date: new Date().toISOString().substr(0, 10),
            include_statuses: statuses.map((item) => item.title),
            format: 'XML',
          }}
        >
          {({
            errors, setFieldValue, values, submitForm,
          }) => (
            <Col>
              {errors.length && <Alert text={errors} />}
              {successMessage && (
              <Alert text="Your request is being processed" type="success" dismiss />
              )}
              <FormComponent handleSubmit={handleSubmit} className="exportForm">
                <Col md={3} className="exportForm__calendars">
                  {getFields(0, 2).map((el, index) => (
                    <Col key={index} md={6} className="exportForm__calendarCol">
                      <ControlLabel>{el.label}</ControlLabel>
                      <Field
                        component={Datepicker}
                        setFieldValue={setFieldValue}
                        defaultDate={el.defaultDate}
                        minDate="1900-01-01"
                        maxDate={new Date().toISOString().substr(0, 10)}
                        setOpen={setOpen}
                        open={open}
                        id={`exportDatepicker${index}`}
                        fieldName={el.name}
                        {...el}
                      />
                    </Col>
                  ))}
                </Col>
                {getFields(2, 4).map((el, index) => (
                  <Col key={index} md={3} className="exportForm__selects">
                    <ControlLabel>{el.label}</ControlLabel>
                    <Field
                      component={el.name === 'include_statuses' ? Select : Dropdown}
                      title={values.format}
                      className="exportForm_dropdown"
                      fieldName={el.name}
                      setFieldValue={setFieldValue}
                      options={statuses}
                      items={export_formats}
                      handleSelect={(value) => setFieldValue(el.name, value.toUpperCase())}
                      {...el}
                      toolbarClass={values.include_statuses.length ? '' : el.toolbarClass}
                    />
                  </Col>
                ))}
                <Col md={3} className="exportForm__submitCol">
                  <Button bsStyle="link" className="export_modalButton" onClick={toggle}>
                    Customize columns
                  </Button>
                  <Button
                    onClick={() => submitForm()}
                    bsStyle="primary"
                    className="exportForm__submit"
                  >
                    Create file
                  </Button>
                </Col>
              </FormComponent>
            </Col>
          )}
        </Formik>
      </Row>
    </div>
  );
};

Form.propTypes = {
  toggle: PropTypes.func,
  include: PropTypes.array,
};

export default Form;
