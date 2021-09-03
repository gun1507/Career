
export default [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/index'),
  },
  {
    path: '/main',
    component: () => import('../views/main/index'),
    children: [
      {
        name: 'History',
        path: '/history',
        component: () => import('../views/history/history')
      },
      {
        name: '사용자이력',
        path: '/user_history',
        component: () => import('../views/userHistory/userHistory')
      },
      {
        name: 'log',
        path: '/log',
        component: () => import('../views/admin/log/log')
      },
      {
        name: 'model',
        path: '/model',
        component: () => import('../views/admin/model/model')
      },
      {
        name: '사용자권한',
        path: '/auth',
        component: () => import('../views/admin/auth/auth')
      },
      {
        name: 'help',
        path: '/help',
        component: () => import('../views/help/help')
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

