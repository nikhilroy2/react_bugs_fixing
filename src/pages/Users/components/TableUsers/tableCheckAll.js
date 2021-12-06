import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../../../../components/Dropdown/Default';

const TableCheckAll = ({
  values, onChangeCheck, accessMassActions, handleSelect,
}) => (
  <th className={values.length > 0 ? 'check-all check-all__show' : 'check-all'}>
    <>
      <div className="check-all__box">
        <input type="checkbox" value="checkAll" onChange={onChangeCheck} checked={values.length > 0} />
      </div>
      <div className="users__mass-act">
        <ul className="mass-act__list">
          <li>
            <span>
              {values.length}
              {' '}
              {values.length > 1 ? 'users' : 'user'}
              {' '}
              selected
            </span>
          </li>
          <li>
            <Dropdown
              handleSelect={handleSelect}
              size="xsmall"
              title="Actions"
              forMassActions
              classForBtnDrop="fontWieghtMed"
              dropStyle="default"
              items={accessMassActions}
              toolbarClass="dropdown-right"
            />
          </li>
        </ul>
      </div>
    </>
  </th>
);

TableCheckAll.propTypes = {
  values: PropTypes.array,
  onChangeCheck: PropTypes.func,
  handleSelect: PropTypes.func,
  accessMassActions: PropTypes.array,
};

export default TableCheckAll;
