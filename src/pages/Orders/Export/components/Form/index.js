/* import/no-extraneous-dependencies: off */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Row, Button, FormGroup } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import moment from 'moment';

import Alert from '../../../../../components/Alert';
import FormComponent from '../../../../../components/Form';

import { getUsersList } from '../../../../../redux/actions/orders';
import { getFields } from './helpers';
import { modes } from '../../helpers';

const Form = ({ toggle, include, users }) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);

  const config = useSelector((state) => state.orders.config);
  const { statuses, export_formats } = config;

  const [successMessage, setSuccessMessage] = useState(false);
  console.log(setSuccessMessage);
  const handleSubmit = async (values, actions) => {
    // const parseValuesOnSubmit = parseValues(values, statuses, include);
    console.log(values, include, actions);
    // try {
    //     await dispatch(onMakeExport(parseValuesOnSubmit));
    //     await dispatch(getExportList());
    //     setSuccessMessage(true);
    // } catch (error) {
    //     setSuccessMessage(false);
    //     actions.setErrors(error);
    // }
  };

  return (
    <Formik
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        date: {
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD'),
        },
        users: [],
        services: [],
        status: statuses.map((item) => item.title),
        providers: [],
        modes: 'All',
        format: 'CSV',
      }}
    >
      {({
        errors, setFieldValue, values, submitForm,
      }) => (
        <FormComponent handleSubmit={handleSubmit}>
          <div className="export__wrapper export__wrapper-orders">
            <Row className="export__row">
              {errors.length && <Alert text={errors} />}
              {successMessage && (
              <Alert text="Your request is being processed" type="success" dismiss />
              )}

              {getFields(statuses, modes, export_formats, users, endDate, startDate, getUsersList).map(
                (el, index) => (
                  <div className="export__col" key={index}>
                    <FormGroup>
                      <label className="control-label">{el.labelName}</label>
                      <Field
                        component={el.component}
                        title={el.name === 'format' ? values.format : values.modes}
                        fieldName={el.name}
                        setFieldValue={setFieldValue}
                        options={el.data}
                        items={el.data}
                        handleSelect={(value) => {
                          if (el.name === 'format') {
                            return setFieldValue(el.name, value.toUpperCase());
                          }

                          setFieldValue(
                            el.name,
                            value[0].toUpperCase() + value.substr(1),
                          );
                        }}
                        onChange={(value) => setFieldValue(el.name, value)}
                        toolbarClass={values.status.length ? '' : el.toolbarClassStr}
                        {...el}
                      />
                    </FormGroup>
                  </div>
                ),
              )}
              <div className="export__col">
                <Button bsStyle="link" className="export__col-modal" onClick={() => toggle()}>
                  Customize columns
                </Button>
                <Button
                  bsStyle="primary"
                  className="export__col-submit"
                  onClick={() => submitForm()}
                >
                  Create file
                </Button>
              </div>
            </Row>
          </div>
        </FormComponent>
      )}
    </Formik>
  );
};

Form.propTypes = {
  users: PropTypes.array,
  toggle: PropTypes.func,
  include: PropTypes.array,
};

export default Form;
