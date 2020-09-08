import Vue from "vue";
import firebase from "firebase";
import VueMaterial from "vue-material";
import router from "./router";
import App from "./App.vue";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";

import formatDate from "./mixins/formatDate";

Vue.mixin(formatDate);

Vue.use(VueMaterial);

Vue.config.productionTip = false;

let app;

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCN1Q7gGNOwmFfOF_CGygCCT3gu7IYHccs",
  authDomain: "customermanagement-c5773.firebaseapp.com",
  databaseURL: "https://customermanagement-c5773.firebaseio.com",
  projectId: "customermanagement-c5773",
  storageBucket: "customermanagement-c5773.appspot.com",
  messagingSenderId: "480819409553",
  appId: "1:480819409553:web:3cc00eaf0249993ae08530",
  measurementId: "G-4TTFVLN9TP",
  auth:{
  "rules": {
    "users": {
      "$user_id": {
        // grants write access to the owner of this user account
        // whose uid must exactly match the key ($user_id)
        ".write": "L7ru3KHaiwcb8356jGvOHmqvoHE5 === auth.uid"
      }
    }
  }
}
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
