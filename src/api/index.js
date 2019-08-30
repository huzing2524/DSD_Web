import Http from '_common/http/'
/**
 * 获取云网用户信息
 * @param params
 * @returns {Promise<*>}
 * @constructor
 */
export function CasiCloud(params) {
  return Http.httpRequest('get','/3rd/casicloud',params)
}
