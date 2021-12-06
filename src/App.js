import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './history';

import ErrorBoundary from '../pages/ErrorBoundary';
import Header from '../pages/Header';
import NotFound from '../pages/404';

import Main from './Main';

import { getNavbarConfigAction } from '../redux/actions/header';
import { getNavbarConfigSelector } from '../redux/selectors/header';
import { ROUTES, defaultRoutesArray, routesSecondary } from '../services/routes';
import { getAutorization } from '../redux/actions/general';

const App = () => {
  const dispatch = useDispatch();
  const { menu, accessRoutes } = useSelector((state) => getNavbarConfigSelector(state));
  const { auth } = useSelector((state) => state.general);
  const redirect = useSelector((state) => state.redirect);
  const { errorData } = redirect;

  useEffect(() => {
    dispatch(getAutorization());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (menu?.length === 0 || !menu) {
      dispatch(getNavbarConfigAction());
    }
  }, [dispatch, menu]);

  const isIncludesDefauktRoutes = ![...ROUTES('', accessRoutes)?.map((item) => item.link), ...routesSecondary].includes(
    window.location.pathname,
  ) && defaultRoutesArray.map((rout) => rout.link).includes(window.location.pathname);

  return (
    <ErrorBoundary>
      <ConnectedRouter history={history}>
        {!auth ? (
          window.location.replace(
            `${window.location.origin}/admin/logout?redirect=${history.location.pathname}${
              history.location.search ? `${history.location.search}` : ''
            }`,
          )
        ) : (
          <>
            {menu && !isIncludesDefauktRoutes && <Header accessRoutes={accessRoutes} />}
            {menu && (
              <Switch>
                <Route
                  exact
                  path={[...ROUTES('', accessRoutes)?.map((item) => item.link), ...routesSecondary]}
                  component={Main}
                />
                {isIncludesDefauktRoutes ? (
                  window.location.replace('/admin')
                ) : (
                  <Route
                    render={() => (
                      <NotFound
                        errorDataMessage={errorData?.data}
                        errorStatus={errorData?.status}
                        errorStatusText={errorData?.statusText}
                      />
                    )}
                  />
                )}
              </Switch>
            )}
          </>
        )}
      </ConnectedRouter>
    </ErrorBoundary>
  );
};

export default App;
