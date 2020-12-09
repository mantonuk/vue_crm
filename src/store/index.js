import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = user;
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
    auth
  }
});
