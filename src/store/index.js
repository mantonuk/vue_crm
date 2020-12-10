import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import user_info from "./user_info";
import currency_info from "./currency_info";
import category from "./category";
import record from "./record";

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
    auth,
    user_info,
    currency_info,
    category,
    record
  }
});
