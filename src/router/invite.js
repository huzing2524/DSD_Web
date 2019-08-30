export default [
  {
    path: '/friends',
    name: 'friends',
    component: () => import('_views/invite/friends/'),
    meta: {
      title: '邀请好友',
    }
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('_views/invite/share/'),
    meta: {
      title: '分享',
    }
  },
]
