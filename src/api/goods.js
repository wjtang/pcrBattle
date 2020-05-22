import request from '@/utils/request'

export function getBatcheList(data) {
  return request({
    url: '/goodsSendBatch/getBatcheList',
    method: 'post',
    params: data
  })
}

export function getGoodsSendList(data) {
  return request({
    url: '/goodsSendBatch/getGoodsSendList',
    method: 'post',
    params: data
  })
}
