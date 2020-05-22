const currentId = {
  state: {
    id: null
  },
  mutations: {
    SET_CURRENTID: (state, id) => {
      state.id = id
    }
  },
  actions: {
    setCurrentId({commit}, id) {
      commit('SET_CURRENTID', id)
    }
  }
}

export default currentId
