import firebase from "firebase/app";

export default {
  actions: {
    async CategoryCreate({commit, dispatch}, {name, limit}) {
      try {
        const uid = await dispatch('getUserId')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({name, limit})
        return {name, limit, id: category.key}
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
};
