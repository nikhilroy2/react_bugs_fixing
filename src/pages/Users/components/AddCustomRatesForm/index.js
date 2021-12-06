import './_addRates.scss';
import './_addRates.dark-mode.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Row, Col, FormControl, FormGroup,
} from 'react-bootstrap';
import _ from 'lodash';

import SearchSelect from '../../../../components/Select/SearchSelect';
import FormikForm from '../../../../components/Form';
import Alert from '../../../../components/Alert';
import RateItem from './rateItem';

import {
  getServicesListAction,
  onUpdateCustomRatesAction,
  onClearUserData,
} from '../../../../redux/actions/users/actions';
import { getUsersListSelector } from '../../../../redux/selectors/users';
import * as helpers from './helpers';

const AddCustomRates = ({
  formRef, ratesValues, setRatesValues, toggle, config, setWasAddRates,
}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [animateValue, setAnimateValue] = useState(false);
  const [focusedItem, setFocusedItem] = useState(false);
  const [ratesFormik, setRatesFormik] = useState([]);

  const userState = useSelector((state) => getUsersListSelector(state));
  const { servicesList, userRates, ratesUserId } = userState;

  const handleSubmit = async (values, actions) => {
    const custom_rates = helpers.submitFormatValue(values);

    try {
      await dispatch(onUpdateCustomRatesAction(ratesUserId, { custom_rates }));
      toggle();
    } catch (error) {
      actions.setErrors(error);
    }
  };

  useEffect(() => {
    dispatch(getServicesListAction());

    return () => dispatch(onClearUserData());
  }, [dispatch]);

  useEffect(() => {
    servicesList && setRatesValues(helpers.findRatesInServices(userRates, servicesList, config));

    if (userRates?.length > 0) {
      setWasAddRates(true);
    } else {
      setWasAddRates(false);
    }
  }, [userRates, servicesList, setRatesValues, config, setWasAddRates]);

  useEffect(() => {
    if (searchValue.length > 0) {
      setAnimateValue(false);
      setFocusedItem(false);
    }
  }, [searchValue]);

  const onSelectRates = (values) => {
    const detectValue = ratesValues.find(({ service_id }) => Number(service_id) === values.service_id);

    if (detectValue) {
      setRatesValues([...ratesFormik]);
    } else {
      const price = Number(values.custom_price).toFixed(helpers.countDecimals(Number(config?.min_service_rate)));
      values.custom_price = price;
      setWasAddRates(true);

      if (!searchValue) {
        setAnimateValue(true);
        setFocusedItem(true);
        setRatesValues([...ratesFormik, values]);
      } else {
        setAnimateValue(false);
        setFocusedItem(true);
        setRatesValues([...ratesFormik, values]);
        setSearchValue('');
      }
    }
  };

  const deleteValue = (id) => {
    if (id) {
      return setRatesValues(ratesFormik.filter((item) => item.id !== id));
    }
  };

  const onChangePercentType = (item, index, setFieldValue) => {
    const { percent } = item;

    if (percent === '0') {
      setFieldValue(`custom_rates.${index}.percent`, '1');
    } else {
      setFieldValue(`custom_rates.${index}.percent`, '0');
    }
  };

  return (
    <>
      <Row className="add-custom__row add-rates__form">
        <Col sm={7}>
          <SearchSelect
            onSelectRates={onSelectRates}
            className="add-rates__select-btn"
            options={helpers.parseServiceList(servicesList, config)}
            toggleBtnTitle="Add custom rate"
            selectTitle="Add custom rate"
            forCustomRates
            name="add_rate"
            closeOnEnter
            selectedOptions={ratesValues}
          />
        </Col>
        <Col sm={5}>
          <FormGroup className="add-rates__input">
            <div className="add-rates__filter-icon" />
            <FormControl
              type="text"
              placeholder="Search services"
              className="add-rates__search"
              value={searchValue}
              onFocus={() => setFocusedItem(false)}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && <div onClick={() => setSearchValue('')} className="add-rates__clear-icon" />}
          </FormGroup>
        </Col>
      </Row>
      <Formik
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        initialValues={{ custom_rates: ratesValues }}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        innerRef={formRef}
      >
        {({
          values, errors, handleSubmit, setFieldValue,
        }) => {
          const filteredRates = helpers.filterRates(values.custom_rates, searchValue);
          setRatesFormik(values.custom_rates);

          return (
            <>
              {errors.length && <Alert text={errors} />}
              <FormikForm handleSubmit={handleSubmit} className="add-rates__form" disableKeyUp>
                <TransitionGroup enter={animateValue} appear={false} exit={false} className="add-rates__service-block">
                  {filteredRates?.map((item) => {
                    const index = _.findIndex(values.custom_rates, ['id', item.id]);

                    return (
                      <CSSTransition timeout={1000} key={item.id} classNames="bg">
                        <RateItem
                          item={item}
                          index={index}
                          setFieldValue={setFieldValue}
                          onChangePercentType={onChangePercentType}
                          focusedItem={focusedItem}
                          deleteValue={deleteValue}
                        />
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
              </FormikForm>
            </>
          );
        }}
      </Formik>
    </>
  );
};

AddCustomRates.propTypes = {
  formRef: PropTypes.object,
  ratesValues: PropTypes.array,
  setRatesValues: PropTypes.func,
  setWasAddRates: PropTypes.func,
  toggle: PropTypes.func,
  config: PropTypes.object,
};

export default AddCustomRates;
