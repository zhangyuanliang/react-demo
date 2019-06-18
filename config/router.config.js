import { message } from 'antd';

export default [
  {
    path: '/',
    component: './Home/Home',
    // component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'icon-dashboard',
        routes: [
          {
            path: '/dashboard/manage-customer',
            name: 'manage-customer',
            component: './Dashboard/ManageCustomer',
            authority: ['manageCustomer'],
          },
        ],
      },
      {
        name: 'exception',
        path: '/exception',
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
