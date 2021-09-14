import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import LogIn from '../views/auth/LogIn.vue';
import Posts from '@/views/posts/Posts.vue';
import Users from '@/views/users/Users.vue';
import UserEdit from '@/views/users/UserEdit.vue';
import ThisUser from '@/views/users/ThisUser.vue';
import UserNew from '../views/users/UserNew.vue';
import UserById from '@/components/users/UserById.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/user-edit/:uid',
    name: 'UserEdit',
    component: UserEdit,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user-this/',
    name: 'ThisUser',
    component: ThisUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user-new/',
    name: 'UserNew',
    component: UserNew
  },
  {
    path: '/user/:uid',
    name: 'UserById',
    component: UserById,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

 router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.loggedInUser) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
