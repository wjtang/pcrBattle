import request from '@/utils/request'

/**
 * 登录接口
 * @param account
 * @param password
 */
export function loginByUsername(loginName, logStr) {
  const data = {
    loginName,
    logStr
  }
  return request({
    url: '/auth/token',
    method: 'post',
    params: data
  })
}


export function login(data) {
  return request({
    url: '/sysUser/login',
    method: 'post',
    params: data
  })
}


export function logout() {
  return request({
    url: '/sysUser/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/sysUser/currentUser',
    method: 'post',
    params: {token}
  })
}

export function register(params) {
  return request({
    url: '/sysUser/register',
    method: 'post',
    params: params
  })
}
