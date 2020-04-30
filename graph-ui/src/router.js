import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter);

const router = new VueRouter(
  {
    mode: 'history',
    routes:
      [
        {
          path: '/',
          name: 'Home',
          component: Home,
          props: true,
        },
        {
          path: '/about',
          name: 'About',
          component: About,
          props: true,
        },
      ]
  }
);

export default router;
