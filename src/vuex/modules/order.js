import * as types from '@/vuex/mutation-types'
const ORDER_SUB = 'ORDER_SUB'
const ORDER_CLIENT_MESSAGE = 'ORDER_CLIENT_MESSAGE'

export default {
  namespaced: true,
  state: {
    order: '1',
    orderSub: {},
    orderClientsMessage: {},
  },
  getters: {
    getOrder: (state) => {
      const {order} = state
      return `${order} 111`
    },
  },
  actions: {
    changeOrder({commit}, payload) {
      let order = `this is ${payload}`
      commit(types.ORDER, order)
    },
    updateOrderSub({commit}, payload) {
      commit(ORDER_SUB, payload)
    },
    updateOrderClientMessage({commit}, payload) {
      commit(ORDER_CLIENT_MESSAGE, payload)
    },
  },
  mutations: {
    [types.ORDER](state, payload) {
      state.order = payload
    },
    [ORDER_SUB](state, payload) {
      state.orderSub = payload === undefined ? {} : {...state.orderSub, ...payload}
    },
    [ORDER_CLIENT_MESSAGE](state, payload) {
      state.orderClientsMessage = payload === undefined ? {} : {...state.orderClientsMessage, ...payload}
    },
  },
}
