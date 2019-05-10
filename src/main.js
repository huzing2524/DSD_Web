import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import './registerServiceWorker'
import 'amfe-flexible'

// cube-ui
import './cube-ui'

Vue.directive('doc-title', function(el, binding) {
  let title = binding.value
  if (title === undefined || window.document.title === title) {
    return
  }
  document.title = title
  let img = el.getAttribute('img-set') || null;
  let mobile = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(mobile)) {
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('src', img || '/favicon.ico');
    iframe.setAttribute('type', '');
    iframe.setAttribute('type', 'image/x-icon');
    let iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback);
        document.body.removeChild(iframe);
      }, 0);
    }
    iframe.addEventListener('load', iframeCallback);
    document.body.appendChild(iframe)
  }
})

// 进度条
import Progress from 'vue-multiple-progress'
Vue.use(Progress)

// 数据处理
import _ from 'lodash'
Vue.prototype._ = _;

// Toast 全局$toast
import Toast from './components/toast/index'
Vue.use(Toast)

// 图表库
import VCharts from 'v-charts'
Vue.use(VCharts)

// 二维码插件
import VueQrcode from '@chenfengyuan/vue-qrcode'
Vue.component(VueQrcode.name, VueQrcode)

// 全局过滤器
import filters from './filters'
Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
