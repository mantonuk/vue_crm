import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import messagePlugin from "@/utils/message.plugin.js";
import "materialize-css/dist/js/materialize.min.js";
import Loader from "@/components/Loader";
import CurrencyFilter from "@/filters/CurrencyFilter";

Vue.config.productionTip = false;

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter("CurrencyFilter", CurrencyFilter);
Vue.component("Loader", Loader);

const firebaseConfig = {
  apiKey: "AIzaSyCPcliXkbxL-q9wOZc9LxWUmS2GcyyTveI",
  authDomain: "vue-crm-ea6aa.firebaseapp.com",
  databaseURL: "https://vue-crm-ea6aa.firebaseio.com",
  projectId: "vue-crm-ea6aa",
  storageBucket: "vue-crm-ea6aa.appspot.com",
  messagingSenderId: "403396618515",
  appId: "1:403396618515:web:51f44d8d81efb5bcf052e6",
  measurementId: "G-6SSKRKDLVX"
};

let app;

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.commit("setCurrentUser", user);
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
