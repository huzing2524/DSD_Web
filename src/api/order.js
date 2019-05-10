import { ArrangeHttpMethod } from '_common/util'

/**
 * 订单首页
 * @param params
 * @param methods
 * @param path
 * @returns {*}
 * @constructor
 */
export function OrderMain (params, methods) {
  return ArrangeHttpMethod(methods)('/order/main' , params)
}

/**
 * 订单首页, 客户排名
 * @param params
 * @param methods
 * @param path
 * @returns {*}
 * @constructor
 */
export function OrderMainCrank (params, methods) {
  return ArrangeHttpMethod(methods)('/order/main/crank' , params)
}

/**
 * 订单列表
 * @param params
 * @param methods
 * @param path
 * @returns {*}
 * @constructor
 */
export function OrderList (params, methods, path) {
  return ArrangeHttpMethod(methods)('/order/list/' + (path || '') , params)
}

/**
 * 产品列表
 * @param params
 * @param methods
 * @param path
 * @returns {*}
 * @constructor
 */
export function OrderProductList (params, methods) {
  return ArrangeHttpMethod(methods)('/order/products' , params)
}

/**
 * 新建订单
 * @param params
 * @param methods
 * @param path
 * @returns {*}
 * @constructor
 */
export function OrderNew (params) {
  return ArrangeHttpMethod('post')('/order/new' , params)
}

/**
 * 修改订单状态
 * @param params
 * @param methods get: 订单详情 put: 修改订单状态
 * @param path id:订单ID
 * @returns {*}
 * @constructor
 */
export function OrderSub (params, methods, path) {
  return ArrangeHttpMethod(methods)('/order/' + (path || '') , params)
}

/**
 * 创建客户
 * @param params
 * @param methods get: 客户列表 ； post: 新建客户
 * @param query id: 分组ID，查询全部可以不带这个参数； body：创建客户Parameters=body
 * @returns {*}
 * @constructor
 */
export function OrderClients (params, methods, path) {
  return ArrangeHttpMethod(methods)('/order/clients/' + (path || '') , params)
}

/**
 * 接口 /order/clients/{id}
 * @param methods get: 客户信息；put 修改客户信息 ；post 添加为客户(需要带订单id）
 * @param path id: 查详情必须要客户ID；  path id：添加客户必须要订单id
 * @param type * required，如果是查询详情这个参数为必须的: 1: 已添加客户，2: 客户资源池客户
 * @returns {*} 客户详情/添加客户
 * @constructor
 */
export function OrderClientsDetail (params, methods,path) {
  return ArrangeHttpMethod(methods)('/order/clients/' + (path || '') , params)
}

/**
 * 搜索客户名称
 * @param params
 * @param methods
 * @param path name: 客户名称
 * @returns {*}
 * @constructor
 */
export function OrderClientSearchs (params, methods, path) {
  return ArrangeHttpMethod('get')('/order/clients/search/' + (path || '') , params)
}

/**
 * 获取客户产品列表
 */
export function getClientsProductsList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/order/clients/products' + (path || '') , params)
}
