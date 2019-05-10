import { ArrangeHttpMethod } from '_common/util'

/**
 * 生产部主页头部
 * @param params
 * @returns {*}
 * @constructor
 */
export function ProductHomeHeader(params) {
  return ArrangeHttpMethod('get')('product/home/header' , params)
}

/**
 * 生产部主页分析
 * @param params
 * @returns {*}
 * @constructor
 */
export function ProductHomeStats(params) {
  return ArrangeHttpMethod('get')('/product/home/stats' , params)
}

/**
 * 工序列表
 * @param {*} params
 * @param {*} path
 */
export function ProcessList(params, path) {
  return ArrangeHttpMethod('get')('/product/process/list'+ (path || '') , params)
}

/**
 * 新增工序
 * @param {name: 'xxx'} params
 * @param {*} path
 */
export function ProcessAdd(params, path) {
  return ArrangeHttpMethod('post')('/product/process/new'+ (path || '') , params)
}

/**
 * 删除工序
 * @param params : {name: 'xxx'}
 * @param path : id
 */
export function ProcessDelete(path) {
  return ArrangeHttpMethod('delete')('/product/process/'+ (path || ''))
}

/**
 * 修改工序
 * @param {name: 'xxx'} params
 * @param id path
 */
export function ProcessChange(params, path) {
  return ArrangeHttpMethod('put')('/product/process/'+ (path || '') , params)
}

/**
 * 工艺列表
 * @param params
 * @param path
 */
export function CraftsList(params, path) {
  return ArrangeHttpMethod('get')('/product/pb/list'+ (path || '') , params)
}


/**
 * 获取工艺
 * @param params
 * @param path ：id
 */
export function CraftsDetail(path) {
  return ArrangeHttpMethod('get')('/product/pb/'+ (path || ''))
}

/**
 * 修改工艺详情
 * @param params： [
  {
    "process_id": "string", // 工序id
    "process_step": "string",
    "materials": [
      {
        "id": "string",
        "count": 0
      }
    ]
  }
]
 * @param path ：id  // 产品id
 */
export function ChangeCrafts(params, path, method) {
  return ArrangeHttpMethod(method)('/product/pb/'+ (path || '') , params)
}

/**
 *  删除工艺
 * @param params {process_step: ''}
 */
export function DeleteCrafts(params,path) {
  return ArrangeHttpMethod('delete')('/product/pb/'+(path||''), params)
}

/**
 * 新增工艺
 * @param  params : {
    "process_id": "string",
    "materials": [
      {
        "id": "string",
        "count": 0
      }
    ]
  }
 */
export function AddCrafts(params) {
  return ArrangeHttpMethod('post')('/product/pb', params)
}


/**
 * 获取物料列表
 * @param params 0: 不根据类目分组 1：根据类目分组
 */
export function GoodsList(params) {
  return ArrangeHttpMethod('get')('/product/material/list', params)
}

/**
 * 物料详情
 * @param path 物料id
 */
export function GoodsDetail(path) {
  return ArrangeHttpMethod('get')('/product/material/detail/' + (path||''))
}

/**
 * 修改物料售价和最低售价
 * @param params { 'price': '', 'lowest_count': '' }
 * @param path 物料id
 */
export function GoodsPriceChange(params, path) {
  return ArrangeHttpMethod('put')('/product/material/detail/'+(path||''), params)
}

/**
 *
 * @param params 物料搜索
 */
export function GoodsSearch(params) {
  return ArrangeHttpMethod('get')('/product/materials/search', params)
}

/**
 * 修改物料成本价和采购量
 * @param params
 * @param path
 */
export function GoodsPriceCount(params, path) {
  return ArrangeHttpMethod('put')('/product/material/detail/'+(path ||''), params)
}

/**
 * 创建物料
 * @param  params { id:'', category_id:'', name:'', unit:'' }
 */
export function GoodsCreate(params) {
  return ArrangeHttpMethod('post')('/product/material/new', params)
}

/**
 * 获取产品列表
 * @param params category 0: 不根据类目分组 1：根据类目分组
 */
export function ProductList(params) {
  return ArrangeHttpMethod('get')('/product/product/list',params)
}

/**
 * 产品搜索
 * @param  params {name: ''}
 */
export function ProductSearch(params) {
  return ArrangeHttpMethod('get')('/product/materials/search', params)
}

/**
 * 产品详情
 * @param path 产品id
 */
export function ProductDetail(path) {
  return ArrangeHttpMethod('get')('/product/product/detail/'+(path||''))
}

/**
 * 修改产品售价
 * @param  params {price: ''}
 * @param path 产品id
 */
export function ProductPriceChange(params,path) {
  return ArrangeHttpMethod('put')('/product/product/detail/'+(path||''),params)
}

/**
 * 添加产品
 * @param params {id:'',category_id:'',name:'',unit:''}
 */
export function ProductCreate(params) {
  return ArrangeHttpMethod('post')('/product/product/new', params)
}


// ---------------
/**
 * 获取补料单列表
 */
export function SupplementList() {
  return ArrangeHttpMethod('get')('/product/material/supplement/list')
}

/**
 * 生产任务单列表
 * return: [状态有四种：wait：待生产，ready：已投料，working：生产中， done：已完工]
 */
export function ProductTakList(){
  return ArrangeHttpMethod('get')('/product/task/list')
}

/**
 * 获取退补料订单物料
 * @param {} path 任务id
 */
export function ProductTsMaterials(path) {
  return ArrangeHttpMethod('get')('product/material/rs_list/'+path || '')
}

/**
 * 生产完工率分析
 * @returns {*}
 * @constructor
 */
export function ProductTaskDoneStats(){
  return ArrangeHttpMethod('get')('/product/task/done/stats')
}

/**
 * 生产金额分析
 * @returns {*}
 * @constructor
 */
export function ProductTaskAccountStats(){
  return ArrangeHttpMethod('get')('/product/task/account/stats')
}

/**
 * 生产备料分析
 * @returns {*}
 * @constructor
 */
export function ProductTaskPrepareStats(){
  return ArrangeHttpMethod('get')('/product/task/prepare/stats')
}

/**
 * 生产需求分析
 * @returns {*}
 * @constructor
 */
export function ProductTaskDemandStats(){
  return ArrangeHttpMethod('get')('/product/task/demand/stats')
}

/**
 * 生产任务单详情
 * @param params
 * @param methods
 * @param path
 * @returns {*}
 * @constructor
 */
export function ProductTaskDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/product/task/detail/' + path, params)
}

/**
 * 获取生产进度
 * @param {*} params 
 * @param {*} methods 
 * @param {*} path  product/task/process/{task_id}/{process_step}
 */
export function ProductProcessDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/product/task/process/' + path, params)
}



/**
 * 获取拆分后的生产任务单
 * @param params
 * @param methods
 * @param path id 生产任务id
 * @returns {*}
 * @constructor
 */
export function ProductTaskSplit(params, methods, path) {
  return ArrangeHttpMethod(methods)('/product/task/split/' + path, params)
}

/**
 * 完工入库
 * @param params
 * @param methods
 * @param path
 * @returns {*}
 * @constructor
 */
export function ProductTaskDone(params, methods, path) {
  return ArrangeHttpMethod(methods)('/product/task/done/' + path, params)
}

/**
 * 获取补料单详情
 * @param  path 补料单id
 */
export function SupplementDetail(path) {
  return ArrangeHttpMethod('get')('/product/material/supplement/detail/'+(path || ''))
}

/**
 * 创建补料单
 *  [
  {
    "id": "string",
    "remark": "string",
    "materials": [
      {
        "id": "string",
        "count": 0
      }
    ]
  }
]
 * @param  params
 */
export function SupplementCreate(params) {
  return ArrangeHttpMethod('post')('/product/material/supplement/create', params)
}

/**
 * 退料单列表
 */
export function ReturnList() {
  return ArrangeHttpMethod('get')('/product/material/return/list')
}

/**
 * 退料单详情
 * @param path 退料单id
 */
export function ReturnDetail(path) {
  return ArrangeHttpMethod('get')('/product/material/return/detail/'+(path||''))
}


/**
 * 扫码人退料单详情
 * @param path 退料单id
 */
export function ReturnQrcodeDetail(path) {
  return ArrangeHttpMethod('get')('/product/material/return/'+(path||''))
}

/**
 * 扫码人退料单确认
 * @param path 退料单id
 */
export function ReturnQrcodeConfirm(params,path) {
  return ArrangeHttpMethod('put')('/product/material/return/'+(path||''), params)
}

/**
 * 创建退料单
 * {
    "id": "string",
    "remark": "string",
    "materials": [
      {
        "id": "string",
        "count": 0
      }
    ]
  }
 * @param params
 */
export function ReturenCreate(params) {
  return ArrangeHttpMethod('post')('/product/material/return/create', params)
}














