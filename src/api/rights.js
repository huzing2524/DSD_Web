/**
 * Created by ll on 19/05/05
 */
import { ArrangeHttpMethod } from '_common/util'

/*
* 权限
*/
export function RightsInfo(params, methods, path) {
  return ArrangeHttpMethod(methods)('/rights/info' + (path || '') , params)
}

/*
* 权限展示列表
*/
export function RightsList(params, methods, path) {
  return ArrangeHttpMethod(methods)('/rights/list' + (path || '') , params)
}

/*
* 新增人员
*/
export function RightsNew(params, methods, path) {
  return ArrangeHttpMethod(methods)('/rights/new' + (path || '') , params)
}

/*
* 修改人员权限
*/
export function RightsModify(params, methods, path) {
  return ArrangeHttpMethod(methods)('/rights/modify' + (path || '') , params)
}

/*
* 修改人员权限
*/
export function RightsDel(params, methods, path) {
  return ArrangeHttpMethod(methods)('/rights/del' + (path || '') , params)
}

/*
* 权限列表
*/
export function RightsOrgs(params, methods, path) {
  return ArrangeHttpMethod(methods)('/rights/orgs' + (path || '') , params)
}
