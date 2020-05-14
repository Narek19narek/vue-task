import Vue from 'vue'
import Vuex from 'vuex'
import httpClient from '../httpClient'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('access_token') || null,
		roleId: localStorage.getItem('role_id') || null,
		userId: localStorage.getItem('user_id') || null,
	},
	getters: {
		loggedIn(state) {
			return state.token !== null
		},
		RoleIsManager(state) {
			return state.roleId == 1;
		},
		UserId(state) {
			return state.userId;
		}
	},
	mutations: {
		retriveToken(state, token) {
			state.token = token
		},
		destroyToken(state) {
			state.token = null
		},
		setRoleId(state, roleId) {
			state.roleId = roleId
		},
		setUserId(state, userId) {
			state.userId = userId
		},
	},
	actions: {
		register(context, data) {
			return new Promise((resolve, reject) => {
				httpClient
					.post('/auth/register', data)
					.then(res => {
						resolve(res)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		retriveToken(context, credentials) {
			return new Promise((resolve, reject) => {
				httpClient
					.post('/auth/login', credentials)
					.then(res => {
						const token = res.data.access_token

						localStorage.setItem('access_token', token)
						context.commit('retriveToken', token)
						resolve(res)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		destroyToken(context) {
			if (context.getters.loggedIn) {
				return new Promise((resolve, reject) => {
					httpClient
						.get('/auth/logout')
						.then(res => {
							localStorage.removeItem('access_token')
							localStorage.removeItem('role_id')
							localStorage.removeItem('user_id');
							context.commit('destroyToken')
							resolve(res)
						})
						.catch(err => {
							localStorage.removeItem('access_token')
							localStorage.removeItem('role_id')
							localStorage.removeItem('user_id');
							context.commit('destroyToken')
							reject(err)
						})
				})
			}
		},
		getUser(context) {
			if (context.getters.loggedIn) {
				return new Promise((resolve, reject) => {
					httpClient
						.get('/auth/user')
						.then(res => {
							localStorage.setItem('user_id', res.data.id);
							context.commit('setUserId', res.data.id)
							resolve(res)
						})
						.catch(err => {
							reject(err)
						})
				})
			}
		},
		changePassword(context, data) {
			if (context.getters.loggedIn) {
				return new Promise((resolve, reject) => {
					httpClient
						.post('/auth/change-password', data)
						.then(res => {
							resolve(res)
						})
						.catch(err => {
							reject(err)
						})
				})
			}
		}
	},
	modules: {
	}
})
