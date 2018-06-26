import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

import Buefy from "buefy";
import "./scss/app.scss";
import "buefy/lib/buefy.css";

window.moment = require("moment");
window.axios = require("axios");
window.axios.defaults.baseURL = "http://videoboard.test/api/";
window.env = {
  captcha: "6LfyrmAUAAAAAFkGHvx-jtbMyqyOMLyRSph1HMC8"
};

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(Vuex);

new Vue({
  router,
  render: h => h(App),
  store: require("./store").default
}).$mount("#app");
