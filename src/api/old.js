
import Http from '_common/http/'

export function GetDSDLog(params) {
  return Http.httpOldRequest('get', '/account/log', params)
}

export function GetDSDAccount(params) {
  return Http.httpOldRequest('get', '/account', params)
}

//邀请注册用户
export function PostInviteRegiste(params,method,path) {
  return Http.httpOldRequest(method, '/api/v2/signup?invite='+ (path || '') , params);
}

//发送短信验证码
export function PostInviteSms(params) {
  return Http.httpOldRequest('post', '/invite/sms', params);
}

//获取邀请好友列表
export function GetInviteContent(params) {
  return Http.httpOldRequest('get', '/invite', params);
}

//提交认证
export function PostAccountAuth(id, country, name, type, image1, image2, image3) {
  let params = {};
  if (id && id.length) {
    params.id = id;
  }
  if (country && country.length) {
    params.country = country;
  }
  if (name && name.length) {
    params.name = name;
  }
  if (type && type.length) {
    params.type = type;
  }
  if (image1 && image1.length) {
    params.image1 = image1;
  }
  if (image2 && image2.length) {
    params.image2 = image2;
  }
  if (image3 && image3.length) {
    params.image3 = image3;
  }
  return Http.httpOldRequest('post', '/account/auth', params);
}
