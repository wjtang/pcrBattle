import request from '@/utils/request'

export function addUser(paramsObj) {
  return request({
    url: '/sysUser/saveUser',
    method: 'post',
    params: paramsObj
  })
}
export function delUsers(paramsObj) {
  return request({
    url: '/sysUser/deleteByIds',
    method: 'post',
    params: paramsObj
  })
}
export function getUserDetail(paramsObj) {
  return request({
    url: '/sysUser/getUserDetail',
    method: 'post',
    params: paramsObj
  })
}
export function getUsers(paramsObj) {
  return request({
    url: '/sysUser/getUserList',
    method: 'post',
    params: paramsObj
  })
}

export function updateMyPwd(paramsObj) {
  return request({
    url: '/sysUser/updateMyPwd',
    method: 'post',
    params: paramsObj
  })
}
export function updatePwd(paramsObj) {
  return request({
    url: '/sysUser/updatePwd',
    method: 'post',
    params: paramsObj
  })
}
export function updateUser(paramsObj) {
  return request({
    url: '/sysUser/updateUser',
    method: 'post',
    params: paramsObj
  })
}
export function updateUserRoles(paramsObj) {
  return request({
    url: '/users/updateUserRoles',
    method: 'post',
    params: paramsObj
  })
}

export function getWebToken(paramsObj) {
  return request({
    url: '/sso/getToken',
    method: 'get',
    params: paramsObj
  })
}

export function ssoLogin(paramsObj) {
  return request({
    url: '/sso/index',
    method: 'get',
    params: paramsObj
  })
}
