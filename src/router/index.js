import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LOG IN',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/this-user',
    name: 'LoginUser',
    component: () => import('../views/LoginUser.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/edit-user/:id',
    name: 'EditAccount',
    component: () => import('../views/EditAccount.vue'),
    props: true
  },
  {
    path: '/users/:id',
    name: 'UserById',
    component: () => import('../components/UserById.vue'),
    props: true
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/posts/Posts.vue')
  },
  {
    path: '/posts/:id',
    name: 'PostById',
    component: () => import('../views/posts/PostById.vue')
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
