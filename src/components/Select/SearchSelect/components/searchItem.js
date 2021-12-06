/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Glyphicon } from 'react-bootstrap';
import _ from 'lodash';

const SearchItem = ({
  filteredOptions,
  optionsTitles,
  index,
  title,
  refs,
  onSelectValue,
  values,
  activeValue,
  setActiveValue,
  setActiveItemPosition,
  forActiveValue,
  forCustomRates,
  onSelectRates,
  onToggleClose,
  selectedOptions,
}) => (
  <>
    {filteredOptions[index].length > 0 && (
      <li className="dropdown-header">
        <span>{title}</span>
      </li>
    )}
    {filteredOptions[index]?.map((elem) => {
      const disabledElem = selectedOptions?.find((el) => Number(el.service_id) === Number(elem.service_id));
      return (
        <li
          ref={refs[elem.id]}
          key={elem.id}
          onClick={(e) => {
            e.preventDefault();

            if (disabledElem) {
              return;
            }

            if (forCustomRates) {
              onToggleClose();
              setActiveValue(elem);
              setActiveItemPosition(_.findIndex(forActiveValue, ['id', elem.id]));
              return onSelectRates(elem);
            }

            onSelectValue(elem.id);
          }}
          className={!forCustomRates && values.includes(elem.id) ? 'menu-item selected' : disabledElem ? 'menu-item disabled' : 'menu-item'}
        >
          <a href="# " role="button" className={activeValue?.id === elem.id ? 'active' : ''}>
            <span className="select-id">{elem.id}</span>
            <span>{elem.title}</span>
            {elem.price && <span className="select-price">{elem.price}</span>}
            {!forCustomRates && values.includes(elem.id) && <Glyphicon glyph="ok" />}
          </a>
        </li>
      );
    })}
    {filteredOptions[index].length === 0 || index === optionsTitles.length - 1 ? '' : <MenuItem divider />}
  </>
);

SearchItem.propTypes = {
  filteredOptions: PropTypes.object,
  optionsTitles: PropTypes.array,
  index: PropTypes.number,
  title: PropTypes.string,
  refs: PropTypes.object,
  onSelectValue: PropTypes.func,
  values: PropTypes.array,
  activeValue: PropTypes.object,
  setActiveItemPosition: PropTypes.func,
  forActiveValue: PropTypes.array,
  forCustomRates: PropTypes.bool,
  onSelectRates: PropTypes.func,
  onToggleClose: PropTypes.func,
  setActiveValue: PropTypes.func,
  selectedOptions: PropTypes.array,
};

export default SearchItem;
