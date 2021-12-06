import React, { useState, useEffect } from 'react';
import {
  Col, Button, ButtonGroup, MenuItem, DropdownButton, Glyphicon,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../../../components/Loaders/Spinner';
import Tooltip from '../../../../components/Tooltip';
import Dropdown from '../../../../components/Dropdown/Default';

import { deleteTicketFunc, markAsUnreadFunc } from '../../helpers';
import { assignAdmin } from '../../../../redux/actions/tickets';

import { getTicketsConfigSelector } from '../../../../redux/selectors/tickets';

const FormControlButtons = ({
  formRef,
  isFetching,
  handleClose,
  id,
  setSettings,
  setError,
  toggle,
  access,
}) => {
  const dispatch = useDispatch();

  const {
    assignment, staff, fetching, assignedAdminId,
  } = useSelector((state) => getTicketsConfigSelector(state));

  const [parsedStaff, setStaff] = useState(staff);
  const [active, setActive] = useState({
    key: staff?.find((el) => Number(el.id) === assignedAdminId)?.id || -1,
    title: staff?.find((el) => Number(el.id) === assignedAdminId)?.title || 'Unassigned',
  });

  const handleSelect = async (key, title) => {
    // eslint-disable-next-line no-useless-catch
    setError('');
  
    try {
      await dispatch(assignAdmin(id, key));
      setActive({ key, title });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (staff && staff.length > 1) setStaff(staff.filter((el) => el.id.toString() !== active.key.toString()));
  }, [active.key, staff]);

  return (
    <>
      <Col xs={12} className="detailsButtons">
        {access?.submit_message && (
          <Button
            bsStyle="primary"
            className="details_button"
            onClick={(...args) => formRef.current.handleSubmit(...args)}
            disabled={isFetching}
          >
            {isFetching && <Spinner />}
            <span>Submit reply</span>
          </Button>
        )}
        <ButtonGroup className="details_button">
          <Button className={!access?.close_ticket ? 'btn-disabled' : ''} onClick={() => handleClose(0)}>
            Close ticket
          </Button>

          <DropdownButton id="bg-nested-dropdown" title="">
            {access?.mark_as_unread && (
              <MenuItem
                eventKey="4"
                onClick={() => markAsUnreadFunc(dispatch, id, setError)}
              >
                Mark as unread
              </MenuItem>
            )}

            {access?.close_and_lock_ticket && (
              <MenuItem eventKey="1" onClick={() => handleClose(1)}>
                Close and lock
                <Tooltip
                  text={(
                    <p>
                      User will not be able
                      <br />
                      {' '}
                      to reply this ticket
                    </p>
                  )}
                  className="details__customPopover"
                >
                  <Glyphicon glyph="info-sign" className="detailsInfoGlyph" />
                </Tooltip>
              </MenuItem>
            )}

            {access?.delete_ticket && (
              <MenuItem
                eventKey="2"
                onClick={() => {
                  setSettings({
                    title: 'Delete ticket?',
                    submit: () => deleteTicketFunc(dispatch, id, setError, toggle),
                    submitStyle: 'danger',
                    extended: false,
                  });
                  toggle();
                }}
              >
                Delete ticket
              </MenuItem>
            )}
          </DropdownButton>
        </ButtonGroup>
      </Col>
      {assignment && staff?.length > 0 && (
        <Col xs={12} className="details_rightBtnCol">
          <Dropdown
            handleSelect={handleSelect}
            toolbarClass="details_dropdownRight"
            items={parsedStaff}
            classForBtnDrop="details_button details_buttonRight"
            disabled={fetching || !access.change_assignee}
            assignedId={active.key}
            title={(
              <span>
                {fetching ? <Spinner /> : <i className="fas fa-user-check" />}
                <span>{active.title}</span>
              </span>
            )}
            disableIndicator
          />
        </Col>
      )}
    </>
  );
};

FormControlButtons.propTypes = {
  formRef: PropTypes.object,
  isFetching: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.number,
  setSettings: PropTypes.func,
  setError: PropTypes.func,
  toggle: PropTypes.func,
  access: PropTypes.object,
};

export default FormControlButtons;
