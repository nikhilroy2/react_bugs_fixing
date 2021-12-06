import Tickets from '../pages/Tickets';
import TicketView from '../pages/Ticket';
import Users from '../pages/Users';
import UsersExport from '../pages/Users/Export';
import Orders from '../pages/Orders';
import OrdersExport from '../pages/Orders/Export';
import Refill from '../pages/Refill';

export const defaultRoutesArray = [
  {
    name: 'Users', link: '/admin/users', component: Users, id: 1,
  },
  {
    name: 'Users Export', link: '/admin/users/export', component: UsersExport, id: 2,
  },
  { name: 'Orders', link: '/admin/orders', id: 3 },
  {
    name: 'Orders New', link: '/admin/ordersnew', component: Orders, id: 4,
  },
  {
    name: 'Orders Export', link: '/admin/ordersnew/export', component: OrdersExport, id: 5,
  },
  { name: 'Subscriptions', link: '/admin/subscriptions', id: 6 },
  { name: 'Drip-feed', link: '/admin/drip-feed', id: 7 },
  {
    name: 'Refill', link: '/admin/refill', component: Refill, id: 8,
  },
  { name: 'Cancel', link: '/admin/cancel', id: 9 },
  { name: 'Services', link: '/admin/services', id: 10 },
  { name: 'Payments', link: '/admin/payments', id: 11 },
  {
    name: 'Tickets', link: '/admin/tickets', component: Tickets, id: 12,
  },
  {
    name: 'Tickets View', link: '/admin/tickets/view', component: TicketView, id: 13,
  },
  { name: 'Affiliates', link: '/admin/affiliates', id: 14 },
  { name: 'Child panels', link: '/admin/child-panels', id: 15 },
  { name: 'Reports', link: '/admin/reports', id: 16 },
  { name: 'Appearance', link: '/admin/appearance', id: 17 },
  { name: 'Settings', link: '/admin/settings', id: 18 },
  { name: 'Account', link: '/admin/account', id: 19 },
  { name: 'Logout', link: '/admin/logout', id: 20 },
];

export const routesSecondary = [
  '/admin/users/export',
  '/admin/tickets/view',
  '/admin/ordersnew/export',
  '/admin/ordersnew',
];

export const ROUTES = (param, accessRoutes) => {
  const id = param;

  const accessRoutesReturn = accessRoutes?.filter((item) => defaultRoutesArray
    .map((route) => {
      if (item.label === route.name) {
        item.name = route.name;
        item.id = route.id;
        item.link = route.link;
        item.component = route.component;
      }

      return route.name;
    })
    .includes(item.label));

  if (id !== '' && typeof id === 'number') {
    return accessRoutesReturn[id];
  }

  return accessRoutesReturn.length > 0 ? accessRoutesReturn : [];
};
