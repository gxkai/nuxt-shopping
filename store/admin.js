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
  async getArticleList(context) {
    const { data } = await this.$axios.get('/articles', {
      params: { categoryId: this.app.context.params.id }
    })
    return data
  },
  async getNbaChampionHistoryList(context) {
    const { data } = await this.$axios.get('/nba-championship-histories')
    return data
  },
  async getDota2ChampionHistoryList(context) {
    const { data } = await this.$axios.get('/dota2champion-histories')
    return data
  }
}
