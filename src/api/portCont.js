import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/portCont/pageList',
    method: 'post',
    params: data
  })
}

export function fetchDetail(data) {
  return request({
    url: '/portCont/detail',
    method: 'post',
    params: data
  })
}

export function getOpRecords(data) {
  return request({
    url: '/portCont/getOpRecords',
    method: 'post',
    params: data
  })
}

export function cargoTrack(data) {
  return request({
    url: '/portCont/cargoTrack',
    method: 'post',
    params: data
  })
}

export function cargoDetails(data) {
  return request({
    url: '/portCont/cargoDetails',
    method: 'post',
    params: data
  })
}
