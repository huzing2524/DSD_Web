import * as types from '@/vuex/mutation-types'
const PURCHASE_DATA = 'PURCHASE_DATA'
const SUPPLIER_DATA = 'SUPPLIER_DATA'

export default {
  namespaced: true,
  state: {
    purchaseDetail: {},
    supplierDetail: {},
    product: {},
  },
  getters: {
  },
  actions: {
    // changePurchaseDetail({commit}, payload) {
    //   let purchase = `this is ${payload}`
    //   commit(types.PURCHASE, purchase)
    // },
    updatePurchase({commit}, payload) {
      commit(PURCHASE_DATA, payload)
    },
    updateSupplierMessage({commit}, payload) {
      commit(SUPPLIER_DATA, payload)
    },
  },
  mutations: {
    // [types.PURCHASE](state, payload) {
    //   state.order = payload
    // },
    [PURCHASE_DATA](state, payload) {
      state.purchaseDetail = payload === undefined ? {} : {...state.purchaseDetail, ...payload}
    },
    [SUPPLIER_DATA](state, payload) {
      state.supplierDetail = payload === undefined ? {} : {...state.supplierDetail, ...payload}
    },
  },
}
