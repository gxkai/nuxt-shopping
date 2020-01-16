export const state = () => {
  return {
    user: null,
    categoryList: [
      { id: 1, title: 'NodeJs' },
      { id: 2, title: 'Linux' }
    ]
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user || null
  },
  setCategoryList(state, categoryList) {
    state.categoryList = categoryList
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  loggedUser(state) {
    return state.user
  },
  categoryList(state) {
    return state.categoryList
  }
}
export const actions = {
  getCategoryList(context) {
    context.commit('setCategoryList', [])
  }
}
