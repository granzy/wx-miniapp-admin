// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'
import router from './router'
import Vuetify from 'vuetify'
import VeeValidate, {Validator} from 'vee-validate'
import zh_cn from 'vee-validate/dist/locale/zh_CN'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Validator.localize('zh_cn', zh_cn);
Vue.use(VeeValidate, {
  errorBagName: 'vee_errors',
  events: "input|blur"
})

axios.defaults.baseURL = 'https://x3q59vzz.qcloud.la/weapp/';
// axios.defaults.baseURL = 'http://localhost:5757/weapp/';

axios.defaults.timeout = 30000;
//定义全局错误处理
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    if (error.response.status === 400) {
      store.commit('snackbar/simpleError', "后台校验数据格式错误");
    } else if (error.response.status === 999) {
      store.commit('snackbar/simpleError', "会话失效，请重新登录！");
    } else if (error.response.status === 401) {
      store.commit('snackbar/simpleError', error.response.data);
    } else if (error.response.status === 500) {
      store.commit('snackbar/simpleError', "请求失败！");
    }
  }
  return Promise.reject(error.response);
});

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.mixin({
  methods:{
    pagerouter: function (param) {
      router.push(param)
    },
    getCommonComponentConfig: function () {
      var commonComponentConfig = {
        dataTableConfig: {
          dataTable_noDataText: '暂无数据',
          dataTable_noResultsText: '无匹配数据',
          dataTable_rowsPerPageText: '每页显示条数',
          dataTable_pagination: {
            descending: false,
            page: 1,
            rowsPerPage: 10,
            sortBy: null,
            totalItems: 0
          },
          dataTable_rows_per_page_items:[5,10,25]
        }
      };
      return _.cloneDeep(commonComponentConfig);
    },

    closeSnackbar: function () {
      this.$store.commit('snackbar/closeSnackbar')
    },
    simpleInfo: function (msg) {
      this.$store.commit('snackbar/simpleInfo', msg)
    },
    simpleError: function (msg) {
      this.$store.commit('snackbar/simpleError', msg)
    },
    simpleSuccess: function (msg) {
      this.$store.commit('snackbar/simpleSuccess', msg)
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
