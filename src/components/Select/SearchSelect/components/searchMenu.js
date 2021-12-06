/* eslint react/no-unused-prop-types: 'off' */
/* eslint jsx-a11y/interactive-supports-focus: 'off' */
/* eslint jsx-a11y/no-autofocus: 'off' */
import React, { forwardRef, useEffect, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, FormGroup } from 'react-bootstrap';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import _ from 'lodash';

import { useWindowSize } from '../../../../utils/helper';

const SearchMenu = forwardRef(
  (
    {
      children,
      rootCloseEvent,
      open,
      setValues,
      setInputValue,
      inputValue,
      filteredOptions,
      values,
      inputRef,
      listRef,
      handleFocus,
      forCustomRates,
      onToggleClose,
      activeValue,
    },
    ref,
  ) => {
    const windowSize = useWindowSize();

    if (!open) {
      setInputValue('');
    }

    const handleKeyDown = (e) => {
      if (e.keyCode === 40 || e.keyCode === 38) {
        e.preventDefault();
      }
    };

    useEffect(
      () => () => _.isEmpty(activeValue)
        && listRef?.current?.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        }),
      [open, listRef, activeValue],
    );

    const childrenWithProps = Children.map(children, (child) => child);

    return (
      <RootCloseWrapper disabled={!open} onRootClose={onToggleClose} event={rootCloseEvent}>
        <div
          style={{
            width: windowSize.width < 400 ? '300px' : windowSize.width < 768 ? `${windowSize.width - 50}px` : '',
            minWidth: windowSize.width < 400 ? '300px' : windowSize.width < 768 ? `${windowSize.width - 50}px` : '',
            maxHeight: `${windowSize.height - 150}px`,
          }}
          ref={ref}
          onClick={() => handleFocus()}
          role="menu"
          className={`dropdown-menu dropdown-menu__filters ${forCustomRates ? 'dropdown-menu__filters-for-custom' : ''}`}
        >
          <FormGroup className="dropdown-menu__input">
            <input
              className="form-control"
              ref={inputRef}
              autoFocus
              autoComplete="false"
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              value={inputValue}
            />
          </FormGroup>
          {!forCustomRates && (
            <ButtonGroup className="dropdown-menu__btn-group" bsSize="small">
              <Button
                onClick={() => setValues(
                  _.union(
                    values,
                      filteredOptions?.map((item) => item.id),
                  ),
                )}
              >
                Select All
              </Button>
              <Button
                onClick={() => setValues(
                  _.difference(
                    values,
                      filteredOptions?.map((item) => item.id),
                  ),
                )}
              >
                Deselect All
              </Button>
            </ButtonGroup>
          )}
          <ul ref={listRef} className="dropdown-menu__inner" style={{ maxHeight: `${windowSize.height - 200}px` }}>
            {childrenWithProps?.map((child) => {
              if (child.type === 'li') {
                return cloneElement(child);
              }

              return cloneElement(child, { onToggleClose });
            })}
          </ul>
        </div>
      </RootCloseWrapper>
    );
  },
);

SearchMenu.propTypes = {
  ref: PropTypes.oneOf([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  inputRef: PropTypes.object,
  listRef: PropTypes.object,
  children: PropTypes.node,
  rootCloseEvent: PropTypes.string,
  open: PropTypes.bool,
  setValues: PropTypes.func,
  setInputValue: PropTypes.func,
  inputValue: PropTypes.string,
  filteredOptions: PropTypes.array,
  values: PropTypes.array,
  handleFocus: PropTypes.func,
  forCustomRates: PropTypes.bool,
  onToggleClose: PropTypes.func,
  activeValue: PropTypes.object,
};

export default SearchMenu;
