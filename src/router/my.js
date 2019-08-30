export default [
  {
    path: '/mydsd',
    name: 'mydsd',
    component: () => import('_views//my/mydsd/'),
    meta: {
      title: '我的DSD',
    }
  },
  {
    path: '/user/security/id',
    name: 'user_security_id',
    component: () => import('_views/my/security/id_auth/'),
    meta: {
      title: '实名认证',
    }
  },
  {
    path: '/user/security/id/complete',
    name: 'user_security_id_complete',
    component: () => import('_views/my/security/auth_complete/'),
    meta: {
      title: '实名认证',
    }
  },
]
