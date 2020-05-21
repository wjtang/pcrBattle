import request from '@/utils/request'

export function getWarningCount(data) {
  return request({
    url: '/contNoError/getWarningCount',
    method: 'post',
    params: data
  })
}
