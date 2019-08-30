export default [
  {
    path: '/order',
    name: 'order',
    component: () => import('_views/order/'),
    meta: {
      title: '订单'
    }
  },
  {
    path: '/order/order_list',
    name: 'order_list',
    component: () => import('_views/order/order_list/'),
    meta: {
      title: '订单列表'
    }
  },
  {
    path: '/order/order_detail',
    name: 'order_detail',
    component: () => import('_views/order/order_detail/'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/order/order_detail/ramark',
    name: 'order_detail_remark',
    component: () => import('_views/order/order_detail/remark/'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/order/order_new',
    name: 'order_new',
    component: () => import('_views/order/order_new/'),
    meta: {
      title: '订单'
    }
  },
  {
    path: '/order/order_new/select_product',
    name: 'order_create_select_product',
    component: () => import ('_views/order/order_new/select_product/'),
    meta: {
      title: '选择出售产品',
    }
  },
  {
    path: '/order/order_new/select_customer',
    name: 'order_create_select_customer',
    component: () => import ('_views/order/order_new/select_customer/'),
    meta: {
      title: '选择客户',
    }
  },
  {
    path: '/order/order_new/enter_remark',
    name: 'order_create_enter_remark',
    component: () => import ('_views/order/order_new/enter_remark/'),
    meta: {
      title: '新建订单',
    }
  },
  {
    path: '/order/clients/client_add',
    name: 'client_add',
    component: () => import ('_views/order/clients/client_add/'),
    meta: {
      title: '添加客户',
    }
  },
  {
    path: '/order/clients/client_message_add',
    name: 'client_message_add',
    component: () => import ('_views/order/clients/client_message_add/'),
    meta: {
      title: '客户信息',// 点击搜索出来的客户名字后打开的详情，这个操作是为了添加客户的。
    }
  },
  {
    path: '/order/clients/client_message_base',
    name: 'client_message_base',
    component: () => import ('_views/order/clients/client_message_base/'),
    meta: {
      title: '',
    }
  },
  {
    path: '/order/clients/client_list',
    name: 'client_list',
    component: () => import ('_views/order/clients/client_list/'),
    meta: {
      title: '客户产品管理',
    }
  },
  {
    path: '/order/clients/client_message_create',
    name: 'client_message_create',
    component: () => import ('_views/order/clients/client_message_create/'),
    meta: {
      title: '',
    }
  },
  {
    path: '/order/clients/client_message_edit',
    name: 'client_message_edit',
    component: () => import ('_views/order/clients/client_message_edit/'),
    meta: {
      title: '编辑客户',
    }
  },
  {
    path: '/order/clients/client_products',
    name: 'client_materials',
    component: () => import ('_views/order/clients/client_products/'),
    meta: {
      title: '客户购买的产品',
    }
  },
]
