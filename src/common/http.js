import Axios from 'axios'
import {ArrangeParams} from './util'
import Bus from '@/bus/'
// import qs from 'querystring'

Axios.defaults.timeout = 20000
Axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
Axios.defaults.headers['Authorization'] = localStorage.getItem("Authorization") + ''
// export const rootUrl = process.env.NODE_ENV == 'development' ? window.location.origin : window.location.origin

const thirdPath = '/bbapi/api/v1' // 第三方
const oldPath = '/bbapi' // 老的

const defaultPath = '/dsdpy/api/v3' // 新的
// const defaultPath = process.env.NODE_ENV == 'development' ? '/api/api/v3' : '/dsdpy/api/v3'

export const rootUrl = window.location.origin

Axios.defaults.baseURL = rootUrl

let requestTime = 0

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  requestTime++
  Bus.$emit('showLoading', requestTime)
  return config;
}, function (err) {
  // 对请求错误做些什么
  requestTime = 0
  Bus.$emit('showLoading', 0)
  Bus.$emit('SystemError', '请求错误，请稍候再试')
  return Promise.reject(err)
})

Axios.interceptors.response.use(function (res) {
  requestTime--
  Bus.$emit('showLoading', requestTime)
  return res
}, function (err) {
  requestTime = 0
  Bus.$emit('showLoading', 0)
  if (parseInt(err.response.status) === 401) {
    Bus.$emit('UnAuthorized')
  } else if (parseInt(err.response.status) === 403) {
    Bus.$emit('NoRightsToBack')
  } else {
    Bus.$emit('SystemError')
  }
  return Promise.resolve(err.response)
})


/**
 * 设置Axios默认header
 * @param key
 * @param value
 */
export function SetDefaultHeader(key, value) {
  Axios.defaults.headers[key] = value
}


class Http {
  httpRequest(method, url, params) {
    let type
    switch (method) {
      case 'post':
        type = Axios.post
        break
      case 'put':
        type = Axios.post
        break
      case 'delete':
        type = Axios.post
        break
      default:
        type = Axios.get
    }
    return new Promise((resolve, reject) => {
      type(thirdPath + url, {params: ArrangeParams(params)}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  httpOldRequest(method, url, params) {
    let type
    switch (method) {
      case 'post':
        type = Axios.post
        break
      case 'put':
        type = Axios.post
        break
      case 'delete':
        type = Axios.post
        break
      default:
        type = Axios.get
    }
    return new Promise((resolve, reject) => {
      type(oldPath + url, {params: ArrangeParams(params)}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
  httpGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      Axios.get(defaultPath + url, {params: ArrangeParams(params)}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  httpPost(url, params) {
    return new Promise((resolve, reject) => {
      Axios.post(defaultPath + url, ArrangeParams(params)).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  httpPut(url, params) {
    return new Promise((resolve, reject) => {
      Axios.put(defaultPath + url, ArrangeParams(params)).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  httpDelete(url, params) {
    return new Promise((resolve, reject) => {
      Axios.delete(defaultPath + url, {params: ArrangeParams(params)}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  httpAuth(url, auth) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {auth: auth}).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default new Http()
