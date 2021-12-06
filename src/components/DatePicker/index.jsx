import './_datePicker.scss';
import './_datePicker.dark-mode.scss';
import 'react-calendar/dist/Calendar.css';
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Glyphicon } from 'react-bootstrap';
import Calendar from 'react-calendar';

import * as helpers from './helpers';

const DatePickerComponent = ({
  id, // required
  defaultDate,
  setOutsideValue,
  setFieldValue,
  minDate,
  maxDate,
  fieldName,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(id);
  const outsideClickHandler = (e) => helpers.handleClickOutside(e, setOpen, ref);

  const formattedDefaultDate = helpers.formatToFullDate(defaultDate);
  const formattedMinDate = helpers.formatToFullDate(minDate);
  const formattedMaxDate = helpers.formatToFullDate(maxDate);

  const [inputValue, setInputValue] = useState(defaultDate || helpers.formatDate(new Date()));
  const [calendarValue, setCalendarValue] = useState(defaultDate ? formattedDefaultDate : new Date());
  const [prevValue, setPrevValue] = useState('');

  const [viewValue, setViewValue] = useState(0);
  const [key, setKey] = useState(1);
  const inc = () => setKey((prev) => prev + 1);

  useEffect(() => {
    helpers.changeDaysAbbr();
    helpers.changeMonthsAbbr(id);
    helpers.removeFlex();
    helpers.observeDaysChange();
  });

  useEffect(() => {
    helpers.changeInlineStyles();
    helpers.changeMonthsAbbr(id);
  }, [viewValue, id]);

  useEffect(() => {
    if (setOutsideValue) setOutsideValue(inputValue, calendarValue);
    if (setFieldValue && fieldName) setFieldValue(fieldName, inputValue);
  }, [inputValue, calendarValue, setOutsideValue, setFieldValue, fieldName]);

  useEffect(() => {
    if (open) {
      document.addEventListener('click', outsideClickHandler);
    }
    return () => {
      document.removeEventListener('click', outsideClickHandler);
    };
  }, [open]);

  return (
    <div className="datePickerWrapper" ref={ref}>
      <FormControl
        onBlur={(e) => helpers.handleInputBlur(e, setInputValue, setCalendarValue, prevValue)}
        onFocus={(e) => helpers.handleInputFocus(setOpen, setPrevValue, e.target.value)}
        onChange={(e) => helpers.handleInputChange(e, setInputValue, setCalendarValue)}
        className={`datePicker__input__id-${id}`}
        onClick={() => setOpen(true)}
        value={inputValue}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            document.querySelector(`.datePicker__input__id-${id}`).blur();
            setOpen(false);
          }
        }}
      />
      <Calendar
        onChange={(value) => helpers.handleCalendarChange(value, setInputValue, setCalendarValue, inc)}
        className={`calendar__id-${id} ${!open ? 'hideCalendar' : ''}`}
        nextLabel={<Glyphicon glyph="chevron-right" />}
        prevLabel={<Glyphicon glyph="chevron-left" />}
        onViewChange={() => {
          setViewValue((prev) => prev + 1);
          setOpen(true);
        }}
        maxDate={formattedMaxDate}
        minDate={formattedMinDate}
        showFixedNumberOfWeeks
        value={calendarValue}
        showNeighboringMonth
        calendarType="US"
        locale="eng"
        key={key}
      />
    </div>
  );
};

DatePickerComponent.propTypes = {
  id: PropTypes.string,
  defaultDate: PropTypes.string,
  setOutsideValue: PropTypes.func,
  setFieldValue: PropTypes.func,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  fieldName: PropTypes.string,
};

export default DatePickerComponent;
