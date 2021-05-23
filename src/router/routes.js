import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

const routes = [
    {
        path: '/', component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: '/',
                redirect: { name: 'login' }
            },
            {
                path: '/login',
                name: 'login',
                meta: {
                    title: 'Login',
                    requiresVisitor: true
                },
                component: () => import('../views/Login')
            },
            {
                path: 'admin',
                component: () => import('../views/admin/Index'),
                children: [
                    {
                        path: 'transactions',
                        name: 'admin.transactions',
                        meta: {
                            title: 'All transactions',
                            requiresAuth: true,
                        },
                        component: () => import('../views/admin/Transactions'),
                    },
                    {
                        path: 'clients',
                        name: 'admin.clients',
                        meta: {
                            title: 'All clients',
                            requiresAuth: true,
                        },
                        component: () => import('../views/admin/Clients'),
                    },
                    {
                        path: 'add-transaction/:id',
                        name: 'admin.add-transaction',
                        meta: {
                            title: 'Add transaction',
                            requiresAuth: true
                        },
                        component: () => import('../views/admin/AddTransaction')
                    },
                    {
                        path: 'add-client',
                        name: 'admin.add-client',
                        meta: {
                            title: 'Add client',
                            requiresAuth: true
                        },
                        component: () => import('../views/admin/AddClient')
                    },
                    {
                        path: 'client-transactions/:id',
                        name: 'admin.client-transactions',
                        meta: {
                            title: 'Client transactions',
                            requiresAuth: true
                        },
                        component: () => import('../views/admin/ClientTransactions')
                    },
                    {
                        path: 'edit-transaction/:id',
                        name: 'admin.edit-transaction',
                        meta: {
                            title: 'Edit transaction',
                            requiresAuth: true
                        },
                        component: () => import('../views/admin/EditTransaction')
                    },
                    {
                        path: 'edit-client/:id',
                        name: 'admin.edit-client',
                        meta: {
                            title: 'Edit client',
                            requiresAuth: true
                        },
                        component: () => import('../views/admin/EditClient')
                    },
                    {
                        path: 'upload-avatar/:id',
                        name: 'admin.upload-avatar',
                        meta: {
                            title: 'Upload avatar',
                            requiresAuth: true
                        },
                        component: () => import('../views/admin/UploadAvatar')
                    },
                ]
            },
            {
                path: "*",
                name: '404',
                component: () => import('../components/PageNotFound')
            },
        ]
    }
]

Vue.use(VueRouter)
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true,
})

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})

export default router