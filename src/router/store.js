export default [
  {
    path: '/store',
    name: 'store',
    component: () =>
      import ('_views/store'),
    meta: {
      title: '仓库首页',
    }
  },
  {
    path: '/store/invoice_order',
    name: 'store_invoice_order',
    component: () =>
      import ('_views/store/invoice_order'),
    meta: {
      title: '发货单',
    }
  },
  {
    path: '/store/invoice_order/detail',
    name: 'store_invoice_order_detail',
    component: () =>
      import ('_views/store/invoice_order/detail'),
    meta: {
      title: '发货单详情',
    }
  },
  {
    path: '/store/picking_order',
    name: 'store_picking_order',
    component: () =>
      import ('_views/store/picking_order'),
    meta: {
      title: '领料单',
    }
  },
  {
    path: '/store/picking_order/detail',
    name: 'store_picking_order_detail',
    component: () =>
      import ('_views/store/picking_order/detail'),
    meta: {
      title: '领料单详情',
    }
  },
  {
    path: '/store/picking_order/success',
    name: 'store_picking_order_success',
    component: () =>
      import ('_views/store/picking_order/success'),
    meta: {
      title: '领料单详情',
    }
  },
  {
    path: '/store/completed_storage',
    name: 'store_completed_storage',
    component: () =>
      import ('_views/store/completed_storage'),
    meta: {
      title: '完工入库',
    }
  },
  {
    path: '/store/completed_storage/detail',
    name: 'store_completed_storage_detail',
    component: () =>
      import ('_views/store/completed_storage/detail'),
    meta: {
      title: '完工入库详情',
    }
  },
  {
    path: '/store/completed_storage/success',
    name: 'store_completed_storage_success',
    component: () =>
      import ('_views/store/completed_storage/success'),
    meta: {
      title: '完工入库详情',
    }
  },
  {
    path: '/store/purchase_warehousing',
    name: 'store_purchase_warehousing',
    component: () =>
      import ('_views/store/purchase_warehousing'),
    meta: {
      title: '采购入库',
    }
  },
  {
    path: '/store/purchase_warehousing/detail',
    name: 'store_purchase_warehousing_detail',
    component: () =>
      import ('_views/store/purchase_warehousing/detail'),
    meta: {
      title: '采购入库详情',
    }
  },
  {
    path: '/store/storage_list',
    name: 'store_storage_list',
    component: () =>
      import ('_views/store/storage_list'),
    meta: {
      title: '库存列表',
    }
  },
  {
    path: '/store/storage_list/detail/product',
    name: 'store_storage_list_detail_product',
    component: () =>
      import ('_views/store/storage_list/detail/product'),
    meta: {
      title: '产品库存详情',
    }
  },
  {
    path: '/store/storage_list/detail/material',
    name: 'store_storage_list_detail_material',
    component: () =>
      import ('_views/store/storage_list/detail/material'),
    meta: {
      title: '物料库存详情',
    }
  },
  {
    path: '/store/storage_list/detail/check',
    name: 'store_storage_list_detail_check',
    component: () =>
      import ('_views/store/storage_list/detail/check'),
    meta: {
      title: '库存盘点',
    }
  },
  {
    path: '/store/storage_check',
    name: 'store_storage_check',
    component: () =>
      import ('_views/store/storage_check'),
    meta: {
      title: '盘点审核',
    }
  },
  {
    path: '/store/storage_check/detail',
    name: 'store_storage_check_detail',
    component: () =>
      import ('_views/store/storage_check/detail'),
    meta: {
      title: '盘点详情',
    }
  },
  {
    path: '/store/purchase_apply',
    name: 'store_purchase_apply',
    component: () =>
      import ('_views/store/purchase_apply'),
    meta: {
      title: '临时申购',
    }
  },
  {
    path: '/store/purchase_apply/detail',
    name: 'store_purchase_apply_detail',
    component: () =>
      import ('_views/store/purchase_apply/detail'),
    meta: {
      title: '临时申购详情',
    }
  },
  {
    path: '/store/purchase_apply/new',
    name: 'store_purchase_apply_new',
    component: () =>
      import ('_views/store/purchase_apply/new'),
    meta: {
      title: '新建申购',
    }
  },
  {
    path: '/store/purchase_apply/select',
    name: 'store_purchase_apply_select',
    component: () =>
      import ('_views/store/purchase_apply/select'),
    meta: {
      title: '选择申购物料',
    }
  },
  {
    path: '/store/purchase_apply/success',
    name: 'store_purchase_apply_success',
    component: () =>
      import ('_views/store/purchase_apply/success'),
    meta: {
      title: '新建申购',
    }
  },
]
