export default [
  {
    path: '/product',
    name: 'product',
    component: () => import('_views/product/'),
    meta: {
      title: '生产'
    }
  },
  {
    path: '/product/task_list',
    name: 'product_task_list',
    component: () => import('_views/product/task_list/'),
    meta: {
      title:'生产任务'
    }
  },
  {
    path: '/product/task_detail',
    name: 'product_task_list_detail',
    component: () => import('_views/product/task_list/task_detail/'),
    meta: {
      title:'生产任务详情'
    }
  },
  {
    path: '/product/task_detail/process_add',
    name: 'product_task_list_detail_process_add',
    component: () => import('_views/product/task_list/task_detail/process_add/'),
    meta: {
      title:'添加生产进度'
    }
  },
  {
    path: '/product/goods_list/',
    name: 'product_goods_list',
    component: () => import('_views/product/goods_list/'),
    meta: {
      title:'物料目录'
    }
  },
  {
    path: '/product/goods_list/detail',
    name: 'product_goods_list_detial',
    component: () => import('_views/product/goods_list/detail/'),
    meta: {
      title: '物料详情'
    }
  },
  {
    path: '/product/goods_list/add',
    name: 'product_goods_list_add',
    component: () => import('_views/product/goods_list/add/'),
    meta: {
      title: '添加物料'
    }
  },
  {
    path: '/product/goods_list/create',
    name: 'product_goods_list_create',
    component: () => import('_views/product/goods_list/create/'),
    meta: {
      title: '创建物料'
    }
  },
  {
    path: '/product/goods_list/detail',
    name: 'product_goods_list_detail',
    component: () => import('_views/product/goods_list/detail/'),
    meta: {
      title: '创建物料'
    }
  },
  {
    path: '/product/goods_list/add_success',
    name: 'product_goods_list_add_success',
    component: () => import('_views/product/goods_list/add_success/'),
    meta: {
      title: '已添加'
    }
  },
  {
    path: '/product/goods_list/detail_two',
    name: 'product_goods_list_detail_two',
    component: () => import('_views/product/goods_list/detail_two/'),
    meta: {
      title: '物料详情'
    }
  },
  {
    path: '/product/goods_list/change',
    name: 'product_goods_list_change',
    component: () => import('_views/product/goods_list/change/'),
    meta: {
      title: '修改物料价格'
    }
  },
  {
    path: '/product/product_list',
    name: 'product_product_list',
    component: () => import('_views/product/product_list/'),
    meta: {
      title: '产品列表'
    }
  },
  {
    path: '/product/product_list/add',
    name: 'product_product_list_add',
    component: () => import('_views/product/product_list/add'),
    meta: {
      title: '添加产品'
    }
  },
  {
    path: '/product/product_list/detail',
    name: 'product_product_list_detail',
    component: () => import('_views/product/product_list/detail'),
    meta: {
      title: '产品详情'
    }
  },
  {
    path: '/product/product_list/detail_two',
    name: 'product_product_list_detail_two',
    component: () => import('_views/product/product_list/detail_two'),
    meta: {
      title: '产品详情'
    }
  },
  {
    path: '/product/product_list/change',
    name: 'product_product_list_change',
    component: () => import('_views/product/product_list/change'),
    meta: {
      title: '修改产品价格'
    }
  },
  {
    path: '/product/product_list/add_success',
    name: 'product_product_list_add_success',
    component: () => import('_views/product/product_list/add_success'),
    meta: {
      title: '已添加'
    }
  },
  {
    path: '/product/product_list/create',
    name: 'product_product_list_create',
    component: () => import('_views/product/product_list/create'),
    meta: {
      title: '创建产品'
    }
  },
  {
    path: '/product/crafts_bom_list',
    name: 'product_crafts_bom_list',
    component: () => import('_views/product/crafts_bom_list'),
    meta: {
      title: '工艺&BOM'
    }
  },
  {
    path: '/product/crafts_bom_list/detail',
    name: 'product_crafts_bom_list/detail',
    component: () => import('_views/product/crafts_bom_list/detail/'),
    meta: {
      title: '工艺&BOM详情'
    }
  },
  {
    path: '/product/crafts_bom_list/add',
    name: 'product_crafts_bom_list/add',
    component: () => import('_views/product/crafts_bom_list/add/'),
    meta: {
      title: '工序名称'
    }
  },
  {
    path: '/product/crafts_bom_list/material_select',
    name: 'product_crafts_bom_list/material_select',
    component: () => import('_views/product/crafts_bom_list/material_select/'),
    meta: {
      title: '工序所需材料'
    }
  },
  {
    path: '/product/crafts_bom_list/add_time',
    name: 'product_crafts_bom_list_add_time',
    component: () => import('_views/product/crafts_bom_list/add_time/'),
    meta: {
      title: '工艺&BOM'
    }
  },
  {
    path: '/product/process_list',
    name: 'product_process_list',
    component: () => import('_views/product/process_list/'),
    meta: {
      title: '工序'
    }
  },
  {
    path: '/product/process_list/add',
    name: 'product_process_list/add',
    component: () => import('_views/product/process_list/add/'),
    meta: {
      title: '工序名称'
    }
  },
  {
    path: '/product/supplement_list',
    name: 'product_supplement_list',
    component: () => import('_views/product/supplement_list'),
    meta: {
      title: '补料列表'
    }
  },
  {
    path: '/product/supplement_list/supplement',
    name: 'product_supplement_list/supplement',
    component: () => import('_views/product/supplement_list/supplement'),
    meta: {
      title: '补料'
    }
  },
  {
    path: '/product/supplement_list/add',
    name: 'product_supplement_list/add',
    component: () => import('_views/product/supplement_list/add'),
    meta: {
      title: '补料'
    }
  },
  {
    path: '/product/supplement_list/material_select',
    name: 'product_supplement_list/material_select',
    component: () => import('_views/product/supplement_list/material_select'),
    meta: {
      title: '选择补料'
    }
  },
  {
    path: '/product/supplement_list/order_confirm',
    name: 'product_supplement_list/order_confirm',
    component: () => import('_views/product/supplement_list/order_confirm'),
    meta: {
      title: '选择补料'
    }
  },
  {
    path: '/product/supplement_list/order_detail',
    name: 'product_supplement_list/order_detail',
    component: () => import('_views/product/supplement_list/order_detail'),
    meta: {
      title: '补料详情'
    }
  },

  {
    path: '/product/return_list',
    name: 'product_return_list',
    component: () => import('_views/product/return_list'),
    meta: {
      title: '退料列表'
    }
  },
  {
    path: '/product/return_list/return',
    name: 'product_return_list/return',
    component: () => import('_views/product/return_list/return'),
    meta: {
      title: '退料'
    }
  },
  {
    path: '/product/return_list/add',
    name: 'product_return_list/add',
    component: () => import('_views/product/return_list/add'),
    meta: {
      title: '退料'
    }
  },
  {
    path: '/product/return_list/material_select',
    name: 'product_return_list/material_select',
    component: () => import('_views/product/return_list/material_select'),
    meta: {
      title: '选择退料'
    }
  },
  {
    path: '/product/return_list/order_confirm',
    name: 'product_return_list/order_confirm',
    component: () => import('_views/product/return_list/order_confirm'),
    meta: {
      title: '退料'
    }
  },
  {
    path: '/product/return_list/order_detail',
    name: 'product_return_list/order_detail',
    component: () => import('_views/product/return_list/order_detail'),
    meta: {
      title: '退料详情'
    }
  },
  {
    path: '/product/return_list/return_success',
    name: 'product_return_list/return_success',
    component: () => import('_views/product/return_list/return_success'),
    meta: {
      title: '退料详情'
    }
  },

]
