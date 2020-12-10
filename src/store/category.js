import firebase from "firebase/app";

export default {
  actions: {
    async CategoryCreate({ commit, dispatch }, { name, limit }) {
      try {
        const uid = await dispatch("getUserId");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ name, limit });
        return { name, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async updateCategory({ commit, dispatch }, { name, limit, id }) {
      try {
        const uid = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ name, limit });
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async CategoriesFetch({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUserId");
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {};
        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key,
          test: "Test"
        }));
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async CategoryFetchById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUserId");
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once("value")
          ).val() || {};
        return {
          ...category,
          id
        };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  }
};
