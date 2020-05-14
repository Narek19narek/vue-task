import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'

import Login from '../components/auth/login'
import Logout from '../components/auth/logout'
import Register from '../components/auth/register'

import Manager from '../views/user/manager'
import Developer from '../views/user/developer'
import Tasks from '../views/user/task.vue'
import Task from '../components/task.vue'



Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/logout',
		name: 'logout',
		component: Logout,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/account/',
		name: 'user',
		component: User,
		meta: {
			requiresAuth: true
		},
	
		children: [
			{
				path: 'manager',
				name: 'manager',
				component: Manager,
				meta: {
					requiresAuth: true
				},
			},
			{
				path: 'developer',
				name: 'developer',
				component: Developer,
				meta: {
					requiresAuth: true
				},
			}
		]
	},
	{
		path: '/tasks',
		name: 'tasks',
		component: Tasks,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/tasks/:id',
		name: 'task',
		component: Task,
		props: true,
		meta: {
			requiresAuth: true
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const authRequired = to.meta.requiresAuth;
	const loggedIn = localStorage.getItem('access_token');

	if (authRequired && !loggedIn)
		next({
			name: 'login'
		})
	else if (!authRequired && loggedIn)
		next({
			name: 'user'
		})
	else
		next();
})


export default router