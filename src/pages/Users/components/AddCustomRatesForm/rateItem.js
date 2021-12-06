import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import {
  Row, Col, InputGroup, Button, Glyphicon,
} from 'react-bootstrap';

import Tooltip from '../../../../components/Tooltip';
import FormikInput from '../../../../components/Inputs/FormikInput';
import CustomTooltip from '../../../../components/Tooltip/customTooltip';

import * as helpers from './helpers';

const RateItem = ({
  item,
  index,
  setFieldValue,
  onChangePercentType,
  focusedItem,
  deleteValue,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onMouseEnter = () => setShowTooltip(true);
  const onMouseLeave = () => setShowTooltip(false);

  const isConverted = helpers.detectConvertedRate(item.converted, item.provider_rate, item.provider_rate_origin);

  return (
    <Row className="item__row">
      <Col md={9}>
        <div className="item__selected-info">
          <span className="item__id">{item.service_id}</span>
          <span className="item__old-rate">{Number(item.price).toFixed(2)}</span>
          <div className="item__rates-name">{item.service_name}</div>
        </div>
      </Col>
      <Col md={3}>
        <div className="form-inline rate__input">
          <div className="form-group form-group__convert">
            <div className="input-group">
              <Field
                id={`price_${item.id}`}
                key={`custom_rates.${index}`}
                name={
                  item.percent === '0' ? `custom_rates.${index}.custom_price` : `custom_rates.${index}.custom_percent`
                }
                component={FormikInput}
                onChange={(e) => helpers.onChangeRatesValue(e, setFieldValue, index, item.percent)}
                onBlur={(e) => helpers.onBlurValidateRate(e, setFieldValue, index, item.percent)}
                focus={focusedItem}
              />
              {isConverted === 'converted' ? (
                <Tooltip
                  text={`${item.provider_rate_origin}${item.currency ? ` ${item.currency}` : ''}`}
                  placement="left"
                  tooltipClass="tooltip__left"
                >
                  <span className="input__rates-provider-value">
                    ≈
                    {' '}
                    {Number.isNaN(item?.provider_rate) ? '' : item?.provider_rate}
                  </span>
                </Tooltip>
              ) : isConverted === 'not-converted' ? (
                <span className="input__rates-provider-value">
                  {Number.isNaN(item?.provider_rate) ? '' : Number(item?.provider_rate)?.toFixed(2)}
                </span>
              ) : null}
              <InputGroup.Button>
                <Button onClick={() => onChangePercentType(item, index, setFieldValue)}>
                  {item.percent === '0' ? '$' : '%'}
                </Button>
              </InputGroup.Button>
            </div>
          </div>
          <Button
            onClick={() => deleteValue(item.id)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="rate__delete"
          >
            <Glyphicon glyph="trash" />
            <CustomTooltip placement={index === 0 ? 'left' : 'top'} show={showTooltip} tooltipText="Delete" />
          </Button>
        </div>
      </Col>
    </Row>
  );
};

RateItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  setFieldValue: PropTypes.func,
  onChangePercentType: PropTypes.func,
  focusedItem: PropTypes.bool,
  deleteValue: PropTypes.func,
};

export default RateItem;
