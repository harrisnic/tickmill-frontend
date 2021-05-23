import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import Notifications from 'vue-notification'
import './assets/scss/app.scss'
import router from './router/routes'
import store from "./store";
import axios from 'axios';
import VueAxios from 'vue-axios';
import Pagination from 'vue-pagination-2';
import Croppa from 'vue-croppa';
import VueConfirmDialog from 'vue-confirm-dialog';
import VueMeta from 'vue-meta';

require('@/store/subscriber');

Vue.prototype.$coreUrl = 'http://localhost:8000';
axios.defaults.baseURL = 'http://localhost:8000';

const token = localStorage.getItem('access_token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

Vue.component('pagination', Pagination);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueConfirmDialog)
Vue.use(Notifications)
Vue.use(VueAxios, axios)
Vue.use(Croppa);
Vue.use(VueMeta);

Vue.config.productionTip = false

Vue.mixin({
    methods: {
        globalNotification: function (type, message) {
            this.$notify({
                group: 'default',
                type: type,
                duration: 3000,
                title: 'Notification',
                text: message
            });
        },
    },
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth === true && store.getters.loggedIn === true) {
        next();
    } else if (to.meta.requiresAuth === true && store.getters.loggedIn === false) {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    } else {
        next();
    }
});

axios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        router.push({name: 'logout'});
    }
    return Promise.reject(error);
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
