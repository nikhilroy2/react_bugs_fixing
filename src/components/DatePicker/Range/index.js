import 'bootstrap-daterangepicker/daterangepicker.css';
import '../_datePicker.dark-mode.scss';
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap-daterangepicker';
import $ from 'jquery';
import moment from 'moment';

const RangePicker = ({ onChange, defStartDate, defEndDate }) => {
  const inputRef = useRef(null);

  const [date, setDate] = useState({
    startDate: moment(defStartDate).format('YYYY-MM-DD'),
    endDate: moment(defEndDate).format('YYYY-MM-DD'),
  });

  useEffect(() => {
    $(inputRef.current).daterangepicker(
      {
        startDate: date.startDate,
        endDate: date.endDate,
        maxDate: new Date(),
        locale: {
          format: 'YYYY-MM-DD',
        },
      },
      (start, end) => {
        setDate({
          startDate: start.format('YYYY-MM-DD'),
          endDate: end.format('YYYY-MM-DD'),
        });
        onChange
                    && onChange({
                      startDate: start.format('YYYY-MM-DD'),
                      endDate: end.format('YYYY-MM-DD'),
                    });
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <input className="form-control" ref={inputRef} />;
};

RangePicker.propTypes = {
  onChange: PropTypes.func,
  defStartDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  defEndDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

RangePicker.defaultProps = {
  defStartDate: moment().subtract(7, 'd'),
  defEndDate: moment(),
};

export default RangePicker;
