/**
 * Created by scott on 2019-02-28
 */
import { ArrangeHttpMethod } from '_common/util/'
// import http from '_utils/http'

// 测测我的企业智能化程度，打分
export function IndustryPlusScore(params, method) {
  return ArrangeHttpMethod(method)('/industry_plus/score', params);
}
export function NewFactory(params, method) {
  return ArrangeHttpMethod(method)('/industry_plus/factory/new', params);
}
