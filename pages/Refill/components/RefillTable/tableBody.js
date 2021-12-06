import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import Dropdown from '../../../../components/Dropdown/Default';
import Tooltip from '../../../../components/Tooltip';

import { makeTableRow, generateAccessItemDrop, generateAccessMassDrop, isValidURL, checkTableCount } from '../../helpers';

const TableBody = ({ tasks, values, onChangeCheck, handleSelect, access }) => {
  const location = useLocation();

  const { t } = useTranslation();

  const queryString = qs.parse(location.search.slice(1));

  return (
    <tbody>
      {tasks?.map((item, index) => (
        <Fragment key={index}>
          <tr key={index} className={values.includes(item.id) ? 'active' : ''}>
            {makeTableRow(item).map((elem, index) => {
              if (elem.type === 'checkbox') {
                if (generateAccessMassDrop(access, t, queryString).length === 0) {
                  return null;
                }

                return (
                  <td key={index} rowSpan="2">
                    <input
                      className="tickets__check"
                      type="checkbox"
                      disabled={item.status === 4 || item.status === 6 || item.status === 7 || item.status === 3 || item.status === 2}
                      onChange={(e) => onChangeCheck(e, item)}
                      checked={values?.includes(item.id)}
                      value={values}
                    />
                  </td>
                );
              }

              if (elem.type === 'actions') {
                if (generateAccessItemDrop(item?.access, access, t).length === 0) {
                  return <td key={index} className="td-caret" rowSpan="2" />;
                }

                return (
                  <td key={index} className="td-caret" rowSpan="2">
                    <Dropdown
                      handleSelect={(key, title) => handleSelect({ key, title, id: item.id }, 'single')}
                      size="xsmall"
                      title={t('Table.Actions')}
                      items={generateAccessItemDrop(item?.access, access, t)}
                      forMassActions
                      classForBtnDrop="fontWieghtMed"
                      dropStyle="default"
                      toolbarClass="dropdown-right"
                      submenuStatuses={[
                        { title: t('ActionsList.In progress'), id: 3 },
                        { title: t('ActionsList.Complete'), id: 7 },
                        { title: t('ActionsList.Rejected'), id: 4 },
                      ]}
                      submenuPlacement="left"
                      user={item}
                      id={item.id}
                      item={item}
                    />
                  </td>
                );
              }

              if (elem.type === 'current_count' || elem.type === 'start_count') {
                const checkErrorType = elem.type === 'current_count' ? item.error_reason_current_count : item.error_reason_start_count;
                const checkValue = checkTableCount(elem.value, checkErrorType);

                return (
                  <td key={index} className="refill-count">
                    {!checkValue.tooltip && <span>{checkValue.value}</span>}
                    {checkValue.tooltip && (
                      <Tooltip placement="top" tooltipClass="tooltip__top" text={checkValue.tooltipText}>
                        <span className={`${checkValue.icon} refill-count__tooltip`} />
                      </Tooltip>
                    )}
                  </td>
                );
              }

              if (elem.type === 'order_id' || elem.type === 'quantity' || elem.type === 'to_refill') {
                if (elem.type === 'order_id') {
                  return (
                    <td key={index}>
                      <a href={`/admin/orders?query=${item.order_id}&search_type=1`} className="order__link">
                        {elem.value}
                      </a>
                    </td>
                  );
                }
                return <td key={index}>{elem.value}</td>;
              }

              if (elem.type === 'service') {
                return (
                  <td key={index} rowSpan="2" className="service__row">
                    {item.service_id !== 0 && <span className="service__id">{item.service_id}</span>}
                    {elem.value}
                  </td>
                );
              }

              return (
                <td key={index} rowSpan="2">
                  {elem.value}
                </td>
              );
            })}
          </tr>

          <tr className="refill-link">
            <td colSpan="5">
              <span>{item.link}</span>
              {isValidURL(item.link) ? (
                <a href={`https://anon.ws/?${item.link}`} className="link-to-refill" rel="noopener noreferrer" target="_blank">
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              ) : null}
            </td>
          </tr>
        </Fragment>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  tasks: PropTypes.array,
  values: PropTypes.array,
  onChangeCheck: PropTypes.func,
  handleSelect: PropTypes.func,
  access: PropTypes.object,
};

export default TableBody;
