import request from '@/utils/request'

export function listRouter(paramsObj) {
  return request({
    url: '/sysMenu/getMenuTree',
    method: 'post',
    params: paramsObj
  })
}
export function addRouter(paramsObj) {
  return request({
    url: '/sysMenu/saveMenu',
    method: 'post',
    params: paramsObj
  })
}
export function batchDelRouter(paramsObj) {
  return request({
    url: '/sysMenu/deleteByIds',
    method: 'post',
    params: paramsObj
  })
}
export function myRouters(paramsObj) {
  return request({
    url: '/sysMenu/myRouters',
    method: 'post',
    params: paramsObj
  })
}
export function update(paramsObj) {
  return request({
    url: '/sysMenu/updateMenu',
    method: 'post',
    params: paramsObj
  })
}
export function getDetail(paramsObj) {
  return request({
    url: '/sysMenu/getMenuDetail',
    method: 'post',
    params: paramsObj
  })
}
export function sortMenu(paramsObj) {
  return request({
    url: '/sysMenu/updateSorts',
    method: 'post',
    params: paramsObj
  })
}

export function getRegionTree(paramsObj) {
  return request({
    url: '/sysRegion/getRegionTree',
    method: 'post',
    params: paramsObj
  })
}

export function getTypes(paramsObj) {
  return request({
    url: '/busType/getTypes',
    method: 'post',
    params: paramsObj
  })
}
