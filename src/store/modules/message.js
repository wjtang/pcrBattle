const message = {
  state: {
    id: null
  },
  mutations: {
    SET_MESSAGEID: (state, id) => {
      state.id = id
    }
  },
  actions: {
    setmessageId({commit}, id) {
      commit('SET_MESSAGEID', id)
    }
  }
}

export default message
