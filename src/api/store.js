/**
 * Created by ll on 19/04/15
 */
import { ArrangeHttpMethod } from '_common/util'

/*
* 仓库首页
*/
export function StoreMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/main' + (path || '') , params)
}

/*
* 发货单首页
*/
export function StoreInvoiceMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/invoice/main' + (path || '') , params)
}

/*
* 订单发货详情-待发货/已发货 订单发货详情-发货操作
*/
export function StoreInvoiceDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/invoice/detail' + (path || '') , params)
}

/*
* 领料单首页
*/
export function StorePickingListMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/picking_list/main' + (path || '') , params)
}

/*
* 领料单详情
*/
export function StorePickingListDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/picking_list/detail' + (path || '') , params)
}

/*
* 完工入库首页
*/
export function StoreCompletedMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/completed_storage/main' + (path || '') , params)
}

/*
* 完工入库单详情 未入库-入库操作
*/
export function StoreCompletedDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/completed_storage/detail' + (path || '') , params)
}

/*
* 采购入库单
*/
export function StorePurchaseMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/purchase_warehousing/main' + (path || '') , params)
}

/*
* 采购入库详情 采购入库详情-入库操作
*/
export function StorePurchaseDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/purchase_warehousing/detail' + (path || '') , params)
}

/*
* 库存列表
*/
export function StoreStorageMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/storage/main' + (path || '') , params)
}

/*
* 库存列表-物料详情/产品详情
*/
export function StoreStorageDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/storage/detail/' + (path || '') , params)
}

/*
* 库存盘点主页
*/
export function StorecheckMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/check/main' + (path || '') , params)
}

/*
* 盘点详情 盘点详情审批
*/
export function StorecheckDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/check/detail' + (path || '') , params)
}

/*
* 盘点详情 盘点详情审批
*/
export function StorecheckNew(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/check/new/' + (path || '') , params)
}

/*
* 临时申购
*/
export function StoreApplyMain(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/temporary_purchase/main' + (path || '') , params)
}

/*
* 临时申购详情
*/
export function StoreApplyDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/temporary_purchase/detail' + (path || '') , params)
}

/*
* 新建申购-选择申购物料
*/
export function StoreMaterialList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/product/material/list' + (path || '') , params)
}

/*
* 新建临时申购
*/
export function StoreApplyNew(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/temporary_purchase/new' + (path || '') , params)
}

/*
* 生成二维码
*/
export function StoreQrCode(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/qr_code/' + (path || '') , params)
}




