import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import TheHome from '../views/TheHome.vue';
import TheLogIn from '../views/auth/TheLogIn.vue';
import ThePosts from '@/views/posts/ThePosts.vue';
import TheUsers from '@/views/users/TheUsers.vue';
import UserEdit from '@/views/users/UserEdit.vue';
import ThisUser from '@/views/users/ThisUser.vue';
import UserNew from '../views/users/UserNew.vue';
import UserById from '@/components/users/UserById.vue';
import PostById from '@/views/posts/PostById';

const routes = [
  {
    path: '/',
    name: 'TheHome',
    component: TheHome
  },
  {
    path: '/login',
    name: 'TheLogIn',
    component: TheLogIn
  },
  {
    path: '/posts',
    name: 'ThePosts',
    component: ThePosts
  },
  {
    path: '/users',
    name: 'TheUsers',
    component: TheUsers
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
  },
  {
    path: '/post/:uid',
    name: 'PostById',
    component: PostById,
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
