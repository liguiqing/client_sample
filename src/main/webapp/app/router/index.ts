import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);
import Router from 'vue-router';
import { Authority } from '@/shared/security/authority';
const Home = () => import('@/core/home/home.vue');
const Error = () => import('@/core/error/error.vue');

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true },
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true },
    },
  ],
});
