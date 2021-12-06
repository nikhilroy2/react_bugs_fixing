import { createSelector } from 'reselect';

const getNavbarConfig = (state) => state.header.navbarConfig;
const getAccessRoutes = (state) => state.header.accessRoutes;

export const getNavbarConfigSelector = createSelector(
  [getNavbarConfig, getAccessRoutes],
  (navbarConfig, accessRoutes) => ({
    parsing_credits: navbarConfig.parsing_credits,
    dark_mode: navbarConfig.dark_mode,
    accessRoutes,
    menu: navbarConfig.menu,
  }),
)
