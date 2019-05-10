import * as types from '@/vuex/mutation-types.js'
const RIGHTS_SUB = 'RIGHTS_SUB'
export default {
  namespaced: true,
  state: {
    rightList: {
      rightsItem:[],
    },
  },
  getters: {
    getRights: (state) => {
      const {rights} = state
      return `${rights} 111`
    },
  },
  actions: {
    changeRights({commit}, info) {
      let rightsInfo = `this is ${info}`
      commit(types.RIGHTS, rightsInfo)
    },
    updateRightsDetail({commit}, payload) {
      commit(RIGHTS_SUB, payload)
    }
  },
  mutations: {
    [types.RIGHTS](state, payload) {
      state.rightList = payload
    },
    [RIGHTS_SUB](state, payload) {
      state.rightList = payload === undefined ? {} : {...state.rightList, ...payload}
    },
  },
}
