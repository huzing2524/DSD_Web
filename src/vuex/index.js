import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

import Modules from './modules'

Vue.use(Vuex)

let modules = {
  ...Modules,
}

export default new Vuex.Store({
  state: {
    phoneReg: /^1[3456789]\d{9}$/,
    niReg: /^[A-Za-z0-9_\u4e00-\u9fa5]{1,10}$/,
    // eslint-disable-next-line
    psdReg: /^[A-Za-z0-9\!\#\$\%\^\&\*\.\~\@\_]{6,18}$/,
  },
  modules,
  actions,
  mutations,
  getters: {
  }
})
