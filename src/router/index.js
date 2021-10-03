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
import PostEdit from '@/views/posts/PostEdit';
import ThePostCreate from '@/views/posts/ThePostCreate';
import NotFound from '@/views/NotFound';

const routes = [
  {
    path: '/',
    name: 'TheHome',
    component: TheHome
  },
  {
    path: '/login',
    name: 'TheLogIn',
    component: TheLogIn,
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Login' }
      ]
    }
  },
  // users
  {
    path: '/users',
    name: 'TheUsers',
    component: TheUsers,
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Users' }
      ]
    }
  },
  {
    path: '/user-edit/:uid',
    name: 'UserEdit',
    component: UserEdit,
    props: true,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Users', link: '/users' }
      ]
    }
  },
  {
    path: '/user-this/',
    name: 'ThisUser',
    component: ThisUser,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Users', link: '/users' }
      ]
    }
  },
  {
    path: '/user-new/',
    name: 'UserNew',
    component: UserNew,
    meta: {
      breadcrumb: [
        { name: 'Registration' }
      ]
    }
  },
  {
    path: '/user/:uid',
    name: 'UserById',
    component: UserById,
    props: true,
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Users', link: '/users' }
      ]
    }
  },
  // posts
  {
    path: '/posts',
    name: 'ThePosts',
    component: ThePosts,
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Posts', link: '/posts' }
      ]
    }
  },
  {
    path: '/post/:uid',
    name: 'PostById',
    component: PostById,
    props: true,
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Posts', link: '/posts' }
      ]
    }
  },
  {
    path: '/post-edit/:pid',
    name: 'PostEdit',
    component: PostEdit,
    props: true,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Posts', link: '/posts' }
      ]
    }
  },
  {
    path: '/post-new/',
    name: 'ThePostCreate',
    component: ThePostCreate,
    meta: {
      requiresAuth: true,
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Posts', link: '/posts' }
      ]
    }
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
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
