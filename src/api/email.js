import request from '@/utils/request'

export function delByIds(data) {
  return request({
    url: '/sysMail/delByIds',
    method: 'post',
    params: data
  })
}

export function detail(data) {
  return request({
    url: '/sysMail/detail',
    method: 'post',
    params: data
  })
}

export function list(data) {
  return request({
    url: '/sysMail/list',
    method: 'post',
    params: data
  })
}

export function save(data) {
  return request({
    url: '/sysMail/save',
    method: 'post',
    params: data
  })
}

export function update(data) {
  return request({
    url: '/sysMail/update',
    method: 'post',
    params: data
  })
}
