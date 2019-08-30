import * as types from '@/vuex/mutation-types.js'
const STORE_SUB = 'STORE_SUB'
export default {
  namespaced: true,
  state: {
    store: '1234',
    storage: {
      storageName: '',
    },
    storeSub: {
      remark: '',
      storageDetail:{},
    },
  },
  getters: {
    getStore: (state) => {
      const {store} = state
      return `${store} 111`
    },
  },
  actions: {
    changeStroe({commit}, info) {
      let storeInfo = `this is ${info}`
      commit(types.STORE, storeInfo)
    },
    updateStoreSub({commit}, payload) {
      commit(STORE_SUB, payload)
    }
  },
  mutations: {
    [types.STORE](state, payload) {
      state.store = payload
    },
    [STORE_SUB](state, payload) {
      state.storage = payload === undefined ? {} : {...state.storage, ...payload}
      state.storeSub = payload === undefined ? {} : {...state.storeSub, ...payload}
    },
  },
}
