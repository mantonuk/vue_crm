import firebase from "firebase/app";

export default {
  actions: {
    async RecordCreate({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUserId");
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  }
};
