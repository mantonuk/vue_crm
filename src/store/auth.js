import firebase from "firebase/app";

//import { mapGetters, mapActions, mapMutations } from "vuex";
//import { mapActions } from "vuex";

export default {
  methods: {
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        console.log("Login action");
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async logout({ commit }) {
      console.log("logout action");
      await firebase.auth().signOut();
      commit("clearUserInfo");
    },

    async register({ dispatch, commit }, { email, password, name }) {
      try {
        console.log(dispatch, commit, email, password);
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        //await dispatch("login", { email, password });
        const uid = await dispatch("getUserId");
        console.log(uid, name);

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
      console.log(dispatch, commit);
    },

    async getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  }
};
