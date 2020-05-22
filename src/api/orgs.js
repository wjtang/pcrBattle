import request from '@/utils/request'

/**
 * 添加机构
 * @param paramsObj
 */
export function addOrg(paramsObj) {
  return request({
    url: '/sysCompany/save',
    method: 'post',
    params: paramsObj
  })
}

/**
 * 获取机构列表
 * @param paramsObj
 */
export function getOrgList(paramsObj) {
  return request({
    url: '/sysCompany/getOrgList',
    method: 'post',
    params: paramsObj
  })
}

/**
 * 删除机构
 * @param paramsObj
 */
export function delOrg(paramsObj) {
  return request({
    url: '/sysCompany/delByIds',
    method: 'post',
    params: paramsObj
  })
}

/**
 * 获取机构详情
 * @param paramsObj
 */
export function getOrgById(paramsObj) {
  return request({
    url: '/sysCompany/detail',
    method: 'post',
    params: paramsObj
  })
}

/**
 * 更新机构
 * @param paramsObj
 */
export function updateOrg(paramsObj) {
  return request({
    url: '/sysCompany/update',
    method: 'post',
    params: paramsObj
  })
}

/**
 * 获取机构树
 * @param paramsObj
 */
export function getOrgTree(paramsObj) {
  return request({
    url: '/sysCompany/pageList',
    method: 'post',
    params: paramsObj
  })
}
/**
 * 审核代理商资料
 * @param paramsObj
 */
export function updateAudit(paramsObj) {
  return request({
    url: '/sysCompany/audit',
    method: 'post',
    params: paramsObj
  })
}
/**
 * 更新代理商资料
 * @param paramsObj
 */
export function updateAgent(paramsObj) {
  return request({
    url: '/sysCompany/update',
    method: 'post',
    params: paramsObj
  })
}
/**
 * 上传附件
 * @param paramsObj
 */
export function uploadFile(paramsObj) {
  return request({
    url: '/common/uploadFile',
    method: 'post',
    params: paramsObj
  })
}

/**
 * 上传附件
 * @param paramsObj
 */
export function getAgentList(paramsObj) {
  return request({
    url: '/sysAgent/getAgentList',
    method: 'post',
    params: paramsObj
  })
}
