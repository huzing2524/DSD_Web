import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const ORDER = 'ORDER'
export default new Vuex.Store({
  state: {
    order: {
      list: {},
      detail: {}
    }
  },
  mutations: {
    [ORDER](state, data) {
      state.order = data || {}
    }
  },
  actions: {
    [ORDER]({commit}, data) {
      commit(ORDER, data)
    }
  }
})
