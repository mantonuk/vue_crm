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
    },
    async RecordsFetch({ dispatch }) {
      try {
        const uid = await dispatch("getUserId");
        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once("value")
          ).val() || {};
        return Object.keys(records).map(key => ({
          ...records[key],
          id: key
        }));
      } catch (error) {
        //console.log(error);
      }
    }
  }
};
