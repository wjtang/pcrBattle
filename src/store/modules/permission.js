import {asyncRouterMap, constantRouterMap} from '@/router'
import {myRouters} from '@/api/menus'

// utils
import {isExternal} from '@/utils'

const _import = require('@/router/_import_' + process.env.NODE_ENV)
/* Layout */
import Layout from '@/views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

function renderRouter(paramsObj) {
  let saveName = []
  let _renderRouter = (item, index, parentItem, subIndex) => {
    const _realName = item.menuName
    if (item.url !== '' && item.url !== null) {
      item.name = item.url.split('/')[1]
    }
    saveName.push(item.url)
    if (item.url === null) {
      item.url = '/'
    }
    item.path = item.url

    if (subIndex === 0 && (item.children === undefined || item.children === null)) {
      item.path = 'index'
    }
    item.meta = {
      title: _realName,
      icon: item.menuCode,
      code: item.code,
      roles: item.roleIds !== undefined ? item.roleIds.split(',') : []
    }
    item.hidden = parseInt(item.locked) === 2 ? true : false
    if (index !== undefined && index !== '') {
      //第一层
      item.component = Layout
      if (item.children !== null && item.children.length === 1) {
        item.alwaysShow = true
        item.redirect = item.path + '/index'
      }
      if (item.children === null || item.children === '') {
        if (item.path !== '' && item.path !== null) {
          item.name = item.path.split('/')[1] + '-parent'
        }

        item.children = [
          {
            url: item.path,
            isTop: true,
            menuCode: item.meta.icon,
            menuName: item.meta.title
          }
        ]
      }
    } else {
      //第二层
      if (item.isTop) {
        //顶层一级菜单没有子元素
        try {
          if (isExternal(item.url)) {
            item.path = item.url
          } else {
            item.component = _import(item.name + '/index')
          }
        } catch (e) {
        }
      } else {
        if (item.path !== null && item.path !== '') {
          //非顶层及有子元素的二级及以下的菜单
          let _pathSplit = item.path.split('/')
          if (_pathSplit.length > 1) {
            _pathSplit = _pathSplit[1]
          } else {
            _pathSplit = _pathSplit[0]
          }
          if (item.code !== null && item.code !== undefined) {
            item.path = _pathSplit + '/' + item.code
            // console.log(item.path)
            // console.log(item.hidden)
            // console.log(item.meta.title)
          } else {
            item.path = _pathSplit //给路由赋予路径
          }

        }
        let __path = ''
        saveName.map(_saveName => {
          __path += _saveName
        })
        if (item.children !== null && item.children.length > 1) {
          item.path = __path
        } else if (item.children !== null && item.children.length === 1) {

          item.path = __path
          item.redirect = saveName.join('') + '/index'
          console.log(item.redirect)
        }
        try {
          item.component = _import(saveName.join('').substring(1, saveName.join('').length) + '/index')
        } catch (e) {
          console.log(e)
        }
      }
    }
    delete item['code']
    delete item['delFlag']
    delete item['displayOrder']
    delete item['flevel']
    delete item['locked']
    delete item['parentId']
    delete item['parentName']
    delete item['menuCode']
    delete item['label']
    delete item['id']
    delete item['url']


    if (item.children !== null && item.children !== undefined) {
      //有子元素则继续循环
      item.children.forEach((subItem, subIndex) => {
        _renderRouter(subItem, '', item, subIndex)
        if (item.children.length === subIndex + 1) {
          saveName.pop()
        }
      })
    } else {
      saveName.pop()
    }
  }
  paramsObj.forEach((item, index) => {
    saveName = []

    //在渲染item之前过滤掉所有hiddens是true的菜单
    if (item.children !== null && item.children.length > 1) {
      let _item = null
      _item = item.children.filter(subItem => {
        return subItem.locked !== 2
      })
      item.children = _item
    }
    _renderRouter(item, index)
  })

  return paramsObj
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// ajax(route.id).then(res=>{route.meta.roles = res})
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    // route.meta.roles = []
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    setRoutes({commit}, data){

    },
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const {roles, info} = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
          myRouters().then(res => {
            res = res.data
            const _myRouters = renderRouter(res.data)

            // console.log(_myRouters)
            commit('SET_ROUTERS', _myRouters)
            resolve()
          })
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        // commit('SET_ROUTERS', accessedRouters)
        // resolve()
      })
    }
  }
}

export default permission

