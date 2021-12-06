import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import Dropdown from '../../../../components/Dropdown/Default';
import DetailsModal from '../../../../components/Modal/Details';

import { makeTableRow, generateAccessItemDrop, itemDropStatuses } from '../../helpers';
import { getOrdersDetailsAction, clearOrdersStateAction } from '../../../../redux/actions/orders';

const TableBody = ({
  orders, values, onChangeCheck, handleSelect, config, orderDetails, actionFetching,
}) => {
  const dispatch = useDispatch();

  const [modaltitle, setModalTitle] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);

  const onToggleOrderDetails = (id, type) => {
    const num = 0;
    dispatch(getOrdersDetailsAction(id, type, num));
    toggleModal();
  };

  return (
    <tbody>
      <DetailsModal
        isOpen={openModal}
        toggleModal={toggleModal}
        title={modaltitle}
        actionFetching={actionFetching}
        detailsData={orderDetails}
        clearStateAction={clearOrdersStateAction}
      />

      {orders?.map((item, index) => (
        <Fragment key={index}>
          <tr key={index} className={values.includes(item.id) ? 'active' : ''}>
            {makeTableRow(item, config?.fields).map((elem, index) => {
              if (elem === false) {
                return null;
              }

              if (elem === 'checkbox') {
                return (
                  <td key={index} rowSpan="2">
                    <input
                      className="tickets__check"
                      type="checkbox"
                      disabled={item.status === 4}
                      onChange={(e) => onChangeCheck(e, item)}
                      checked={values?.includes(item.id)}
                      value={values}
                    />
                  </td>
                );
              }

              if (elem === 'actions') {
                if (item.status === 8) {
                  return <td key={index} className="td-caret" rowSpan="2" />;
                }

                return (
                  <td key={index} className="td-caret" rowSpan="2">
                    <Dropdown
                      handleSelect={(key, title) => handleSelect(key, title, item)}
                      size="xsmall"
                      title="Actions"
                      items={generateAccessItemDrop(item?.access)}
                      forMassActions
                      classForBtnDrop="fontWieghtMed"
                      dropStyle="default"
                      toolbarClass="dropdown-right"
                      submenuStatuses={itemDropStatuses(
                                                    config?.statuses,
                                                    item.access.change_status,
                      )}
                      submenuPlacement="left"
                      user={item}
                      id={item.id}
                      item={item}
                    />
                  </td>
                );
              }
              if (index === 4) {
                return (
                  <td rowSpan="2" className="refill-link" key={index}>
                    <span>{item.link}</span>
                    <Button
                      bsSize="xsmall"
                      className="refill-button"
                      onClick={() => {
                        setModalTitle(item.order_buttons.title);
                        onToggleOrderDetails(item.id, item.type);
                      }}
                    >
                      {item.order_buttons.title}
                    </Button>
                    <a
                      href={item.link_url}
                      className="link-to-refill"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  </td>
                );
              }

              if (index === 7) {
                return (
                  <td key={index} rowSpan="2" className="service__row">
                    <span className="service__id">{item.service_id}</span>
                    {elem}
                  </td>
                );
              }

              if (index === 10) {
                return (
                  <td key={index} rowSpan="2">
                    {elem.split(' ').map((date, i) => (
                      <span key={i} className="nowrap">
                        {date}
                      </span>
                    ))}
                  </td>
                );
              }

              if (index === 1 || index === 3) {
                return <td key={index}>{elem}</td>;
              }

              if (index === 2) {
                return (
                  <td key={index}>
                    <span>{elem}</span>
                    {config?.fields?.api_type && (
                    <span className="label label-api">{item.type_name}</span>
                                            )}
                  </td>
                );
              }

              return (
                <td key={index} rowSpan="2">
                  {elem}
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="border-none p-t-0" colSpan="2">
              {config?.fields?.external_id && (
              <div className="grey orders-pay-hash">{item.external_id}</div>
                                )}
            </td>
            <td className="border-none p-t-0">
              {config?.fields?.cost && <div className="grey">{item.cost_original}</div>}
            </td>
          </tr>
        </Fragment>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  orders: PropTypes.array,
  values: PropTypes.array,
  onChangeCheck: PropTypes.func,
  handleSelect: PropTypes.func,
  config: PropTypes.object,
  orderDetails: PropTypes.array,
  actionFetching: PropTypes.bool,
};

export default TableBody;
