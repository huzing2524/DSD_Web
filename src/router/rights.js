export default [
  {
    path: '/rights',
    name: 'rights',
    component: () =>
      import('_views/rights'),
    meta: {
      title: '权限管理'
    }
  },
  {
    path: '/rights/create',
    name: 'rights_create',
    component: () =>
      import('_views/rights/create'),
    meta: {
      title: '添加管理员'
    }
  },
  {
    path: '/rights/detail',
    name: 'rights_detail',
    component: () =>
      import('_views/rights/detail'),
    meta: {
      title: '管理员详情'
    }
  },
]
