import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import Dropdown from '../../../../components/Dropdown/Default';
import DropdownRequest from '../../../../components/Dropdown/Request';

import { getRefillModesAction, getRefillServicesAction, clearRefillState } from '../../../../redux/actions/refill';
import { getRefillSelector } from '../../../../redux/selectors/refill';
import { generateTableHead, generateAccessMassDrop } from '../../helpers';

const TableHead = ({
  values, onChangeCheck, handleSelect, access,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { t } = useTranslation();

  const queryString = qs.parse(location.search.slice(1));

  const { modes, services } = useSelector((state) => getRefillSelector(state));

  return (
    <thead>
      <tr>
        {generateTableHead().map((name, index) => {
          switch (name) {
            case 'All':
              if (generateAccessMassDrop(access, t, queryString).length === 0) {
                return null;
              }

              return (
                <th key={index} className={values.length > 0 ? 'check-all check-all__show' : 'check-all'}>
                  <div className="check-all__box">
                    <input type="checkbox" value="checkAll" onChange={onChangeCheck} checked={values.length > 0} />
                  </div>
                  <div className="tickets__mass-act">
                    <ul className="mass-act__list">
                      <li>
                        <span>
                          <Trans
                            i18nKey="Table.MassCounterRefill"
                            defaults="{{count}} tasks selected"
                            values={{ count: values.length }}
                          />
                        </span>
                      </li>
                      <li>
                        <Dropdown
                          handleSelect={(key, title) => handleSelect({ key, title }, 'mass')}
                          size="xsmall"
                          title={t('Table.Actions')}
                          submenuStatuses={[
                            { title: t('ActionsList.In progress'), id: 3 },
                            { title: t('ActionsList.Complete'), id: 7 },
                            { title: t('ActionsList.Rejected'), id: 4 },
                          ]}
                          forMassActions
                          classForBtnDrop="fontWieghtMed"
                          dropStyle="default"
                          items={generateAccessMassDrop(access, t, queryString)}
                          toolbarClass="dropdown-right"
                        />
                      </li>
                    </ul>
                  </div>
                </th>
              );

            case 'Service':
              return (
                <th key={index} className="tickets__status">
                  <DropdownRequest
                    title={t('Table.Service')}
                    items={services}
                    queryRequest="service"
                    withServicesId
                    onRequestFunc={() => dispatch(getRefillServicesAction(queryString))}
                    clearData={() => dispatch(clearRefillState())}
                  />
                </th>
              );

            case 'Mode':
              return (
                <th key={index} className="tickets__status">
                  <DropdownRequest
                    title={t('Table.Mode')}
                    items={modes}
                    queryRequest="mode"
                    onRequestFunc={() => dispatch(getRefillModesAction(queryString))}
                    clearData={() => dispatch(clearRefillState())}
                    withAll
                  />
                </th>
              );

            default:
              return <th key={index}>{name ? t(`Table.${name}`) : ''}</th>;
          }
        })}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  values: PropTypes.array,
  onChangeCheck: PropTypes.func,
  handleSelect: PropTypes.func,
  access: PropTypes.object,
};

export default TableHead;
