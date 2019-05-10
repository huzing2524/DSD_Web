import * as types from '@/vuex/mutation-types.js';
// import {userInfo} from "@/api/common";

export default {
	changeOrder({commit}, info) {
      let userInfo = `this is ${info}`;
      commit(types.ORDER, userInfo);
    },
  changeStroe({commit}, info) {
    let storeInfo = `this is ${info}`;
    commit(types.STORE, storeInfo);
  },
  changeRights({commit}, info) {
    let rightsInfo = `this is ${info}`
    commit(types.RIGHTS, rightsInfo)
  },
}
