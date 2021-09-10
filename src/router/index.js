import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LOGIN from '../views/Auth.vue';
import Registration from '../views/Registration.vue';
import LoginUser from '../views/LoginUser.vue';
import Users from '../views/Users.vue';
import EditAccount from '../views/EditAccount.vue';
import UserById from '../components/UserById.vue';
import Posts from '../views/posts/Posts.vue';
import PostById from '../views/posts/PostById.vue';
import EditPost from '../views/posts/EditPost.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LOG-IN',
    component: LOGIN
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/this-user',
    name: 'LoginUser',
    component: LoginUser
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/edit-user/:id',
    name: 'EditAccount',
    component: EditAccount,
    props: true
  },
  {
    path: '/users/:id',
    name: 'UserById',
    component: UserById,
    props: true
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/post/:id',
    name: 'PostById',
    component: PostById,
    props: true
  },
  {
    path: '/e-post/:id',
    name: 'EditPost',
    component: EditPost,
    props: true
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
