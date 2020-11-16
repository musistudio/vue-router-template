/*
 * @Author: jinhui.li
 * @Date: 2020-09-15 16:52:25
 * @LastEditors: jinhui.li
 * @LastEditTime: 2020-11-16 16:25:57
 * @Description: 适配qiankun
 */
import './public-path';
import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
import VueRouter from 'vue-router';
import xbb from 'xbb-sdk'

Vue.config.productionTip = false;

Vue.prototype.$xbb = xbb

let instance = null;
let router = null;


function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/purehtml' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export const bootstrap = xbb.bootstrap;
export const mount = xbb.mount;
xbb.ready(render);


export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
  return Promise.resolve();
}
