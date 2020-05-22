const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // saveKeepAlive: state => state.tagsView.saveKeepAlive,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  orgId: state => state.user.orgId,
  personalGroupID: state => state.user.personalGroupID,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  currentId: state => state.currentId.id,
  isAdmin: state => state.user.isAdmin,
  account: state => state.user.account,
  identity: state => state.user.identity,
  navMap: state => state.user.navMap
}

export default getters
