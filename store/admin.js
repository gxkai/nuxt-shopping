export const state = () => {
  return {
    categoryList: []
  }
}

export const mutations = {
  setCategoryList(state, categoryList) {
    state.categoryList = categoryList
  }
}

export const getters = {
  categoryList(state) {
    return state.categoryList
  }
}
export const actions = {
  async getCategoryList(context) {
    const { data } = await this.$axios.get('/categories')
    context.commit('setCategoryList', data)
    return data
  },
  async getArticleList(context, { categoryId }) {
    const { data } = await this.$axios.get('/articles', {
      params: { categoryId }
    })
    return data
  }
}
