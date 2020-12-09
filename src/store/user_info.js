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
      console.log("123");
      try {
        const uid = await dispatch("getUserId");
        const user_info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once("value")
        ).val();
        console.log(user_info);
        commit("setUserInfo", user_info);
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    user_info: s => s.user_info
  }
};
