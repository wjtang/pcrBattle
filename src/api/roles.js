import request from '@/utils/request'

// 角色列表
export function getRolesList(params) {
  return request({
    url: '/sysRole/getRoleList',
    method: 'post',
    params: params
  })
}

// 角色详情
export function getRolesDetail(params) {
  return request({
    url: '/sysRole/getRoleDetail',
    method: 'post',
    params: params
  })
}

/**
 * 角色新增 / 修改
 * @param key = saveRole / updateRole
 * @param params
 */
export function addOrUpdateRole(key, params) {
  return request({
    url: `/sysRole/${key}`,
    method: 'post',
    params: params
  })
}

// 角色删除
export function delRole(params) {
  return request({
    url: '/sysRole/deleteByIds',
    method: 'post',
    params: params
  })
}

// 角色组列表
export function getRoleGroupList(params) {
  params.parentId = 0
  return request({
    url: '/sysRole/getRoleList',
    method: 'post',
    params: params
  })
}

// 角色组详情
export function getRoleGroupDetail(params) {
  return request({
    url: '/sysRole/getRoleDetail',
    method: 'post',
    params: params
  })
}

// 角色组创建
export function addRolesGroups(params) {
  params.parentId = 0
  return request({
    url: '/sysRole/saveRole',
    method: 'post',
    params: params
  })
}



// 角色组更新
export function updateRolesGroups(params) {
  return request({
    url: '/sysRole/updateRole',
    method: 'post',
    params: params
  })
}

// 角色组删除
export function delRoleGroup(params) {
  return request({
    url: '/sysRole/deleteByIds',
    method: 'post',
    params: params
  })
}

// 获取角色下的机构以及用户
export function getOrgsAndUsers(params) {
  return request({
    url: '/sysRole/getUsersAndAgents',
    method: 'post',
    params: params
  })
}

// 编辑角色机构
export function updateRoleOrgs(params) {
  return request({
    url: '/sysRole/bindRoleAgents',
    method: 'post',
    params: params
  })
}

// 编辑角色用户
export function updateRoleUsers(params) {
  return request({
    url: '/sysUserRole/saveRoleUser',
    method: 'post',
    params: params
  })
}
//获取数据权限港口数据
export function getPortTree(params = {}) {
  return request({
    url: '/sysRegion/getRegionTree',
    method: 'post',
    params: params
  })
}
//更新角色数据权限
export function updateRolePorts(params = {}) {
  return request({
    url: '/sysRole/bindRoleRegions',
    method: 'post',
    params: params
  })
}
//更新角色授权菜单
export function updateRoleRouter(params = {}) {
  return request({
    url: '/sysMenuRole/saveRoleMenu',
    method: 'post',
    params: params
  })
}

//获取已授权的数据权限及菜单权限
export function getPortsAndRouters(params = {}) {
  return request({
    url: '/sysRole/getRegionsAndMenus',
    method: 'post',
    params: params
  })
}

// 角色组创建
export function getRoleTree(params) {
  return request({
    url: '/sysRole/getRoleTree',
    method: 'post',
    params: params
  })
}
