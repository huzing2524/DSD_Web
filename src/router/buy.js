export default [
  /*以下为采购相关*/
  {
    path: '/purchase',
    name: 'purchase_',
    component: () => import('_views/purchase/'),
    meta: {
      title: '采购',
    }
  },
  {
    path: '/purchase/purchase_list',
    name: 'purchase_list',
    component: () => import('_views/purchase/purchase_list'),
    meta: {
      title: '采购列表',
    }
  },
  {
    path: '/purchase/purchase_list/purchase_detail',
    name: 'purchase_detail',
    component: () => import('_views/purchase/purchase_list/purchase_detail'),
    meta: {
      title: '采购详情',
    }
  },
  {
    path: '/purchase/purchase_list/purchase_modify',
    name: 'purchase_modify',
    component: () => import('_views/purchase/purchase_list/purchase_modify'),
    meta: {
      title: '修改采购',
    }
  },
  {
    path: '/purchase/purchase_list/purchase_cancel',
    name: 'purchase_cancel',
    component: () => import('_views/purchase/purchase_list/purchase_cancel'),
    meta: {
      title: '取消采购',
    }
  },
  {
    path: '/purchase/purchase_list/purchase_approved',
    name: 'purchase_approved',
    component: () => import('_views/purchase/purchase_list/purchase_approved'),
    meta: {
      title: '通过采购',
    }
  },
  /*以下是采购统计分析部分*/
  {
    path: '/purchase/statistic_analysis/purchase_arrival_rate',
    name: 'purchase_arrival_rate',
    component: () => import('_views/purchase/statistic_analysis/purchase_arrival_rate'),
    meta: {
      title: '采购到货率',
    }
  },
  {
    path: '/purchase/statistic_analysis/purchase_executive_condition',
    name: 'purchase_executive_condition',
    component: () => import('_views/purchase/statistic_analysis/purchase_executive_condition'),
    meta: {
      title: '采购执行情况',
    }
  },
  {
    path: '/purchase/statistic_analysis/purchase_money',
    name: 'purchase_money',
    component: () => import('_views/purchase/statistic_analysis/purchase_money'),
    meta: {
      title: '采购金额',
    }
  },
  {
    path: '/purchase/statistic_analysis/purchase_submit_ontime_rankinglist',
    name: 'purchase_submit_ontime_rankinglist',
    component: () => import('_views/purchase/statistic_analysis/purchase_submit_ontime_rankinglist'),
    meta: {
      title: '供应商准时提交排行榜',
    }
  },

  /*以下为采购的供应商相关*/
  {
    path: '/purchase/supplier/supplier_shop_management',
    name: 'supplier_shop_management',
    component: () => import('_views/purchase/supplier/supplier_shop_management'),
    meta: {
      title: '供应商商品管理',
    }
  },
  {
    path: '/purchase/supplier/supplier_add',
    name: 'supplier_add',
    component: () => import('_views/purchase/supplier/supplier_add'),
    meta: {
      title: '增加供应商',
    }
  },
  {
    path: '/purchase/supplier/supplier_create',
    name: 'supplier_create',
    component: () => import('_views/purchase/supplier/supplier_create'),
    meta: {
      title: '',
    }
  },
  {
    path: '/purchase/supplier/supplier_chooice',
    name: 'supplier_chooice',
    component: () => import('_views/purchase/supplier/supplier_chooice'),
    meta: {
      title: '选择供应商',
    }
  },
  {
    path: '/purchase/supplier/supplier_message_chooice',// 选择添加时查询点击供应商展示用，还有后续操作
    name: 'supplier_message_chooice',
    component: () => import('_views/purchase/supplier/supplier_message_chooice'),
    meta: {
      title: '供应商信息',
    }
  },
  {
    path: '/purchase/supplier/supplier_message_create',// 创建供应商填完信息后展示用，还有后续操作
    name: 'supplier_message_create',
    component: () => import('_views/purchase/supplier/supplier_message_create'),
    meta: {
      title: '',
    }
  },
  {
    path: '/purchase/supplier/supplier_message_edit',// 从供应商商品列表进去，是编辑。
    name: 'supplier_message_edit',
    component: () => import('_views/purchase/supplier/supplier_message_edit'),
    meta: {
      title: '供应商信息',
    }
  },
  {
    path: '/purchase/supplier/product_price_modify',
    name: 'product_price_modify',
    component: () => import('_views/purchase/supplier/product_price_modify'),
    meta: {
      title: '产品价格',
    }
  },
  {
    path: '/purchase/supplier/create_supplier_add_material',//创建完供应商基本信息后跳转到这个"用户自己公司想要的物料列表"，选择的东西是自己公司缺的希望能采购的，可能供应商没有。
    name: 'create_supplier_add_material',
    component: () => import('_views/purchase/supplier/create_supplier_add_material'),
    meta: {
      title: '向供应商采购的物料',
    }
  },
  {
    path: '/purchase/supplier/supplier_add_deliver_days',//创建完供应商基本信息后跳转到选择到货天数
    name: 'supplier_add_deliver_days',
    component: () => import('_views/purchase/supplier/supplier_add_deliver_days'),
    meta: {
      title: '供应商信息',
    }
  },



]
