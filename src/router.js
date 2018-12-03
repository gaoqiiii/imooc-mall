import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: () => import ('./views/GoodsList.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import ('./views/Cart.vue')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('./views/AddressList.vue')
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: () => import('./views/OrderConfirm.vue')
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: () => import('./views/orderSuccess.vue')
    }
  ]
})
