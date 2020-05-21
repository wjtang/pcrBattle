const company = {
  state: {
    id: null
  },
  mutations: {
    SET_COMPANYTID: (state, id) => {
      state.id = id
    }
  },
  actions: {
    setcompanyId({commit}, id) {
      commit('SET_COMPANYTID', id)
    }
  }
}

export default company
