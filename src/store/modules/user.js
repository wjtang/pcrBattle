import {getUserInfo, login, logout} from '@/api/login'
import {getWarningCount} from '@/api/navMenu'
import {getToken, removeToken, setToken} from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    loginName: '',
    name: '',
    account: '',
    avatar: '',
    introduction: '',
    orgId: '',
    roles: [],
    userID: '',
    setting: {
      articlePlatform: []
    },
    isAdmin: false,
    navMap: {}
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_USERID: (state, id) => {
      state.userID = id
    },
    SET_ORGID: (state, orgId) => {
      state.orgId = orgId
    },
    IS_ADMIN: (state, flag) => {
      state.isAdmin = flag
    },
    SET_IDENTITY: (state, identity) => {
      state.identity = identity
    },
    SET_NAV_MAP: (state, map) => {
      state.navMap = map
    }
  },

  actions: {
    SetTokenToStore({commit}, state) {
      commit('SET_TOKEN', state)
      setToken(state) // 把登录结果保存在cookie中
      // commit('SET_ROLES', ['admin']) // 暂时先个一个角色，日后如果用会VUE登录这里要修改
    },
    // 用户名登录
    LoginByUsername({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login({account: username, loginPwd: userInfo.password}).then(response => {
          const data = response.data
          if (data.code === 200) {
            resolve()
            commit('SET_TOKEN', data.data.token) // 把登录结果放到store
            setToken(data.data.token) // 把登录结果保存在cookie中
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const res = response.data
          if (res.code === 200) {
            const response = {data: {}}
            if (res.data.isAdmin) {
              response.data.roles = [0]
              response.data.roles.push('admin')
            } else {
              response.data.roles = res.data.roleIds.split(',').map(item => {
                return item === '' ? item : parseInt(item)
              })
              response.data.roles.push('admin')
            }
            commit('SET_ROLES', response.data.roles)
            if(res.data.identityFlag == 2){
              commit('SET_NAME', res.data.companyName + res.data.account)
            }else{
              commit('SET_NAME', res.data.nickName)
            }
            commit('SET_ACCOUNT', res.data.account)
            commit('SET_USERID', res.data.id)
            commit('SET_ORGID', res.data.agentId)
            commit('IS_ADMIN', res.data.isAdmin)
            commit('SET_IDENTITY', res.data.identityFlag)
            resolve(response)
          } else {
            reject(response)
          }
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          // commit('SET_INTRODUCTION', data.introduction)
          // resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        // commit('SET_TOKEN', '')
        // commit('SET_ROLES', [])
        // removeToken()
        // resolve()
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({commit}, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    },

    GetWarningCount({commit, state}) {
      return new Promise(resolve => {
        getWarningCount().then((response) => {
          const data = response.data
          commit('SET_NAV_MAP', data.data)
          resolve()
        })
      })
    }

  }
}

export default user
