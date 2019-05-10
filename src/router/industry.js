export default [
  {
    path: '/industry/more',
    name: 'industry',
    component: () => import('_views/industry/industry_more/'),
    meta: {
      title: '我想进一步了解',
    }
  },
  {
    path: '/industry',
    name: 'industry_more',
    component: () => import('_views/industry/industry_plus/'),
    meta: {
      title: '智能+',
    }
  },
  {
    path: '/industry/test',
    name: 'industry_test',
    component: () => import('_views/industry/industry_test/'),
    meta: {
      title: '测测我的企业智能化程度',
    }
  },
]
