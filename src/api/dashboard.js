import request from '@/utils/request'

export function dashboard(data) {
  return request({
    url: '/statistics/index',
    method: 'post',
    params: data
  })
}

export function dashboardWarning(data) {
  return request({
    url: '/statistics/index/warningStatistics',
    method: 'post',
    params: data
  })
}
