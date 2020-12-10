import firebase from "firebase/app";

//import { mapGetters, mapActions, mapMutations } from "vuex";
//import { mapActions } from "vuex";

export default {
  state: {
    user_info: {}
  },
  mutations: {
    setUserInfo(state, user_info) {
      state.user_info = user_info;
    },
    clearUserInfo(state) {
      state.user_info = {};
    }
  },
  actions: {
    async fetchUserInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUserId");
        const user_info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once("value")
        ).val();
        commit("setUserInfo", user_info);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async updateUserInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUserId");
        const updateData = { ...getters.user_info, ...toUpdate };
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updateData);
        commit("setUserInfo", updateData);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  },
  getters: {
    user_info: s => s.user_info
  }
};
