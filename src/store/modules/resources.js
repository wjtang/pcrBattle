import { getResources } from '../../api/resources'

const resources = {
  state: {
    list: []
  },
  mutations: {
    SET_DATA: (state, data) => {
      state.list = data
    }
  },
  actions: {
    // 用户名登录
    GetResources({ commit }, paramsObj) {
      return new Promise((resolve, reject) => {
        getResources(paramsObj).then(response => {
          commit('SET_DATA', response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default resources
