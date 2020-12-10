import firebase from "firebase/app";

//import { mapGetters, mapActions, mapMutations } from "vuex";
//import { mapActions } from "vuex";

export default {
  methods: {},
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearUserInfo");
    },

    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        //await dispatch("login", { email, password });
        const uid = await dispatch("getUserId");

        await firebase
          .database()
          .ref("/users/" + uid + "/info")
          .set({
            bill: 1234,
            name
          });
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  }
};
