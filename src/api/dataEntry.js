import request from '@/utils/request'

export function getHsClassList(data) {
  return request({
    url: '/hsClass/getHsClassList',
    method: 'post',
    params: data
  })
}

export function getGoodsList(data) {
  return request({
    url: '/goods/getGoodsList',
    method: 'post',
    params: data
  })
}

export function addGoods(data) {
  return request({
    url: '/goods/addGoods',
    method: 'post',
    params: data
  })
}

export function updateGoods(data) {
  return request({
    url: '/goods/updateGoods',
    method: 'post',
    params: data
  })
}

export function detail(data) {
  return request({
    url: '/goods/detail',
    method: 'post',
    params: data
  })
}

export function updateReport(data) {
  return request({
    url: '/goods/updateReport',
    method: 'post',
    params: data
  })
}

export function delByIds(data) {
  return request({
    url: '/goods/delByIds',
    method: 'post',
    params: data
  })
}
