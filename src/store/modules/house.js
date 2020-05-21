const house = {
  state: {
    id: null,
    canChange:false
  },
  mutations: {
    SET_HOUSEID: (state, id) => {
      state.id = id
    },
    SET_CHANGE: (state,flag) => {
      state.canChange = flag;
    }
  },
  actions: {
    sethouseId({commit}, id) {
      commit('SET_HOUSEID', id)
    },
    setCanchange({commit}, flag) {
      commit('SET_CHANGE', flag)
    }
  }
}

export default house
