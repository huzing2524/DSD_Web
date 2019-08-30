import { ArrangeHttpMethod } from '_common/util'

/**
 * 采购首页
 * @param params
 */
export function PurhcaseMain (params) {
  return ArrangeHttpMethod('get')('/purchase/main' , params)
}

/**
 *
 * 采购单首页, 供应商排名
 * @param params
 * @param methods
 * @param path 1: 采购单列表， 2: 采购单交货率， 3: 采购单金额, 4: 供应商贡献度
 */
export function PurhcaseMainCrank (params, path) {
  return ArrangeHttpMethod('get')('/purchase/main/crank' + (path || '') , params)
}

/**
 * /purchase/list/{type}采购列表
 * @param params
 * @param methods
 * @param path  类型, 1: 采购单列表， 2: 采购单交货率， 3: 采购单金额, 4: 供应商贡献度
 */
export function getPurchaseList (path) {
  return ArrangeHttpMethod('get')('/purchase/list/' + (path || ''))
}

/**
 * 采购单详情/修改采购单
 * @param params
 * @param methods get: 获取采购单详细信息 put: 修改采购单详情
 * @param path ：id
 */
export function PurchaseOrder(params, method, path) {
  return ArrangeHttpMethod(method)('/purchase/'+ (path || '') , params)
}

/**
 * 创建供应商
 * @param methods post:
 * @param body:{
  "name": "string",
  "contact": "string",
  "phone": "string",
  "position": "string",
  "industry": "string",
  "region": "string",
  "address": "广东省深圳市宝安区福永街道五道口前海2区4巷滨海大厦608",
  "materials": [
    {
      "id": "string",
      "unit_price": 0
    }
  ]
  }
 * result: { "res": 0,"errmsg": "string"}
 */
export function SupplierCreate (params) {
  return ArrangeHttpMethod('post')('/purchase/supplier', params)
}

/**
 * 供应商详情/添加供应商
 * @param params
 * @param methods get:获取供应商详情；post：添加为供应商；put 修改供应商信息
 * @param path id: 供应商id
 */
export function SupplierDetail (params, methods, path) {
  return ArrangeHttpMethod(methods)('/purchase/supplier/' + (path || '') , params)
}

/**
 * 搜索供应商名称
 * @param params
 */
export function SupplierSearch (params) {
  return ArrangeHttpMethod('get')('/purchase/supplier/search' , params)
}

/**
 * 获取供应商列表
 */
export function getSupplierList() {
  return ArrangeHttpMethod('get')('/purchase/supplier/list')
}

/**
 * 获取供应商物料列表
 */
export function getSupplierMaterialsList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/purchase/supplier/materials' + (path || '') , params)
}
