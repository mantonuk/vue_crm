import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = user;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {},
  getters: {
    getError: state => state.error
  },
  modules: {
    auth
  }
});
