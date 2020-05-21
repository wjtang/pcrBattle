import request from '@/utils/request'

export function getList(paramsObj) {
  return request({
    url: '/friendLink/getList',
    method: 'post',
    params: paramsObj
  })
}

export function getById(paramsObj) {
  return request({
    url: '/friendLink/getById',
    method: 'post',
    params: paramsObj
  })
}

export function addLink(paramsObj) {
  return request({
    url: '/friendLink/add',
    method: 'post',
    params: paramsObj
  })
}

export function deleteLink(paramsObj) {
  return request({
    url: '/friendLink/delete',
    method: 'post',
    params: paramsObj
  })
}

export function update(paramsObj) {
  return request({
    url: '/friendLink/update',
    method: 'post',
    params: paramsObj
  })
}
