import * as types from '@/vuex/mutation-types'

export default {
    [types.ORDER](state, payload) {
      state.order = payload
    },
    [types.STORE](state, payload) {
      state.store = payload
    },
    [types.RIGHTS](state, payload) {
      state.rightList = payload
    },
}
