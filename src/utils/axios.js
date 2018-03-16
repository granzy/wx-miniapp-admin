import _axios from 'axios'
import store from '@/store';

export function axios (config) {
  var defaultConfig = {
    baseURL: 'http://localhost:5757/weapp/',
    timeout: 30000
  }
  if (config) {
    defaultConfig = _.defaults(config, defaultConfig)
  }
  var __axios = _axios.create(defaultConfig)

  //定义全局错误处理
  __axios.interceptors.response.use((response) => {
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

  return __axios
}
