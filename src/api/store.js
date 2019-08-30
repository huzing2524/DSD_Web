/**
 * Created by ll on 19/04/15
 */
import { ArrangeHttpMethod } from '_common/util'

/*
* 仓库首页
*/
export function StoreMain(params, methods) {
  return ArrangeHttpMethod(methods)('/store/main' , params)
}

/*
* 发货单首页
*/
export function StoreInvoiceMain(params, methods) {
  return ArrangeHttpMethod(methods)('/store/invoice/main' , params)
}

/*
* 订单发货详情-待发货/已发货 订单发货详情-发货操作
*/
export function StoreInvoiceDetail(params, methods) {
  return ArrangeHttpMethod(methods)('/store/invoice/detail' , params)
}

/*
* 领料单首页
*/
export function StorePickingListMain(params, methods) {
  return ArrangeHttpMethod(methods)('/store/picking_list/main' , params)
}

/*
* 领料单详情
*/
export function StorePickingListDetail(params, methods) {
  return ArrangeHttpMethod(methods)('/store/picking_list/detail' , params)
}

/*
* 完工入库首页
*/
export function StoreCompletedMain(params, methods) {
  return ArrangeHttpMethod(methods)('/store/completed_storage/main' , params)
}

/*
* 完工入库单详情 未入库-入库操作
*/
export function StoreCompletedDetail(params, methods) {
  return ArrangeHttpMethod(methods)('/store/completed_storage/detail' , params)
}

/*
* 采购入库单
*/
export function StorePurchaseMain(params, methods) {
  return ArrangeHttpMethod(methods)('/store/purchase_warehousing/main' , params)
}

/*
* 采购入库详情 采购入库详情-入库操作
*/
export function StorePurchaseDetail(params, methods) {
  return ArrangeHttpMethod(methods)('/store/purchase_warehousing/detail' , params)
}

/*
* 库存列表
*/
export function StoreStorageMain(params, methods) {
  return ArrangeHttpMethod(methods)('/store/storage/main' , params)
}

/*
* 库存列表-物料详情/产品详情
*/
export function StoreStorageDetail(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/storage/detail' + (path ? ('/' + path) : '') , params)
}

/*
* 物料/产品详情-修改仓库位置
*/
export function StoreStorageMove(params, methods) {
  return ArrangeHttpMethod(methods)('/store/multi_storage/move' , params)
}

/*
* 库存列表 仓库-选择 新建 修改 删除
*/
export function StoreStorageSelect(params, methods) {
  return ArrangeHttpMethod(methods)('/store/multi_storage/select' , params)
}

/*
* 库存盘点主页
*/
export function StorecheckMain(params, methods) {
  return ArrangeHttpMethod(methods)('/store/check/main' , params)
}

/*
* 盘点详情 盘点详情审批
*/
export function StorecheckDetail(params, methods) {
  return ArrangeHttpMethod(methods)('/store/check/detail' , params)
}

/*
* 新增盘点
*/
export function StorecheckNew(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/check/new' + (path ? ('/' + path) : '') , params)
}

/*
* 临时申购
*/
export function StoreApplyMain(params, methods) {
  return ArrangeHttpMethod(methods)('/store/temporary_purchase/main' , params)
}

/*
* 临时申购详情
*/
export function StoreApplyDetail(params, methods) {
  return ArrangeHttpMethod(methods)('/store/temporary_purchase/detail' , params)
}

/*
* 新建申购-选择申购物料
*/
export function StoreMaterialList(params, methods) {
  return ArrangeHttpMethod(methods)('/product/material/list' , params)
}

/*
* 新建临时申购
*/
export function StoreApplyNew(params, methods) {
  return ArrangeHttpMethod(methods)('/store/temporary_purchase/new' , params)
}

/*
* 生成二维码
*/
export function StoreQrCode(params, methods, path) {
  return ArrangeHttpMethod(methods)('/store/qr_code' + (path? ('/' + path) : '') , params)
}




