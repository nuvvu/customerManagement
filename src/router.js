import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Fleet from '@/views/Fleet.vue';
import Talks from '@/views/Talks.vue';
import Rents from '@/views/Rents.vue';
import Archive from '@/views/Archive.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/Flota',
      name: 'Flota',
      component: Fleet,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/Rozmowy',
      name: 'Rozmowy',
      component: Talks,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/Wypozyczenia',
      name: 'Wypozyczenia',
      component: Rents,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/Archiwum',
      name: 'Archiwum',
      component: Archive,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if (!requiresAuth && currentUser) {
    next('Home');
  } else {
    next();
  }
});

export default router;
