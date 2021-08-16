
export default [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/Index'),
  },
  {
    path: '/main',
    component: () => import('../views/main/Index'),
    children: [
      {
        name: 'History',
        path: '/history',
        component: () => import('../views/history/History')
      },
      {
        name: '사용자이력',
        path: '/user_history',
        component: () => import('../views/userHistory/UserHistory')
      },
      {
        name: 'log',
        path: '/log',
        component: () => import('../views/admin/log/Log')
      },
      {
        name: 'model',
        path: '/model',
        component: () => import('../views/admin/model/Model')
      },
      {
        name: '사용자권한',
        path: '/auth',
        component: () => import('../views/admin/auth/Auth')
      },
      {
        name: 'help',
        path: '/help',
        component: () => import('../views/help/Help')
      },

    ]
  },

  // {
  //   path: '*',
  //   component: () => import('../views/pages/Index'),
  //   children: [
  //     {
  //       name: '404 Error',
  //       path: '/',
  //       component: () => import('../views/pages/Error')
  //     }
  //   ]
  // },
]

