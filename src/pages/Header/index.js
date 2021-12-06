import './_header.scss';
import './_header.dark-mode.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navbar, Nav, NavItem, Badge, NavDropdown,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '../../components/Tooltip';

import { ROUTES } from '../../services/routes';
import { getPartsOfArray } from './helpers';
import { getNavbarConfigSelector } from '../../redux/selectors/header';
import useWindowSize from './hook';
import { switchViewMode } from '../../redux/actions/general';

export const Header = () => {
  const navbarConfig = useSelector((state) => getNavbarConfigSelector(state));
  const { parsing_credits, accessRoutes } = navbarConfig;

  const location = useLocation();
  const dispatch = useDispatch();

  const { darkMode, darkModeFetching } = useSelector((state) => state.general);
  const windowSize = useWindowSize(ROUTES('', accessRoutes)?.length);

  const { t } = useTranslation();

  return (
    <Navbar fluid fixedTop>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav id="navbar-left">
          {getPartsOfArray(
            ROUTES('', accessRoutes),
            windowSize.width < 768
              ? ROUTES('', accessRoutes).length - 2
              : ROUTES('', accessRoutes).length - Math.max(windowSize.widthItems, 2),
          ).map((el) => (
            <NavItem
              eventKey={el.id}
              key={el.id}
              className={`navLink ${location.pathname.includes(el.link) ? 'activeNavLink' : ''}`}
              componentClass={
                                    location.pathname.includes('/admin/ordersnew') && el.name === 'Orders'
                                      ? Link
                                      : el.component
                                        ? Link
                                        : undefined
                                }
              to={
                                    location.pathname.includes('/admin/ordersnew') && el.name === 'Orders'
                                      ? '/admin/ordersnew'
                                      : el.component
                                        ? el.link
                                        : undefined
                                }
              href={
                                    location.pathname.includes('/admin/ordersnew') && el.name === 'Orders'
                                      ? '/admin/ordersnew'
                                      : el.link
                                }
            >
              {el.name ? t(`Navbar.${el.name}`) : ''}
              {' '}
              {el.count > 0 && <Badge className="badge-header">{el.count}</Badge>}
            </NavItem>
          ))}
          {windowSize.widthItems > 2 && windowSize.width > 767 && (
            <NavDropdown
              pullRight
              title={<FontAwesomeIcon icon={faEllipsisV} />}
              id="basic-nav-dropdown"
              noCaret
            >
              {getPartsOfArray(
                getPartsOfArray(ROUTES('', accessRoutes), ROUTES('', accessRoutes).length - 2),
                -windowSize.widthItems + 2,
              ).map((el) => (
                <NavItem
                  eventKey={el.id}
                  key={el.id}
                  className={`navLink ${
                    location.pathname.includes(el.link) ? 'activeNavLink' : ''
                  }`}
                  componentClass={
                                            location.pathname.includes('/admin/ordersnew') && el.name === 'Orders'
                                              ? Link
                                              : el.component
                                                ? Link
                                                : undefined
                                        }
                  to={
                                            location.pathname.includes('/admin/ordersnew') && el.name === 'Orders'
                                              ? '/admin/ordersnew'
                                              : el.component
                                                ? el.link
                                                : undefined
                                        }
                  href={
                                            location.pathname.includes('/admin/ordersnew') && el.name === 'Orders'
                                              ? '/admin/ordersnew'
                                              : el.link
                                        }
                >
                  {el.name ? t(`Navbar.${el.name}`) : ''}
                  {' '}
                  {el.count > 0 && <Badge className="badge-header">{el.count}</Badge>}
                </NavItem>
              ))}
            </NavDropdown>
          )}
        </Nav>
        <Nav pullRight id="navbar-right">
          {parsing_credits ? (
            <NavItem componentClass="div" className="navbar-item-credits">
              <Tooltip text="Parsing credits">
                <Badge>{parsing_credits}</Badge>
              </Tooltip>
            </NavItem>
          ) : null}
          <NavItem
            className="navbar-item-mode"
            onClick={() => {
              if (!darkModeFetching) {
                dispatch(switchViewMode(darkMode ? 0 : 1));
              }
            }}
          >
            {darkMode ? <i className="fal fa-sun modeIcon" /> : <i className="fas fa-moon modeIcon" />}
          </NavItem>
          {getPartsOfArray(ROUTES('', accessRoutes), -2).map((el) => (
            <NavItem
              className={`navLink ${location.pathname.includes(el.link) ? 'activeNavLink' : ''}`}
              eventKey={el.id}
              key={el.id}
              href={el.link}
            >
              {el.name ? t(`Navbar.${el.name}`) : ''}
            </NavItem>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

