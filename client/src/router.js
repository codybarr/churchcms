import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'

import Sermons from '@/views/Sermons.vue'
import CurrentSeries from '@/views/sermons/CurrentSeries.vue'
import ViewAllSermons from '@/views/sermons/ViewAllSermons.vue'
import SermonSeries from '@/views/sermons/SermonSeries.vue'
import ViewSermonSeries from '@/views/sermons/ViewSermonSeries.vue'

import ViewSermon from '@/views/sermons/ViewSermon.vue'

import Blog from '@/views/Blog.vue'
import BlogPost from '@/views/blog/BlogPost.vue'

import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'

import Admin from '@/views/Admin.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminPages from '@/views/admin/AdminPages.vue'
import AdminPosts from '@/views/admin/AdminPosts.vue'
import AdminUsers from '@/views/admin/AdminUsers.vue'

import AdminSermons from '@/views/admin/AdminSermons.vue'
import AdminSermonSeriesTab from '@/views/admin/sermons/AdminSermonSeriesTab.vue'
import AdminSermonsTab from '@/views/admin/sermons/AdminSermonsTab.vue'

import store from '@/store'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/sermons',
			component: Sermons,
			children: [
				{
					path: 'all',
					name: 'view-all-sermons',
					component: ViewAllSermons
				},
				{
					path: 'current-series',
					name: 'current-sermon-series',
					component: CurrentSeries
				},
				{
					path: 'series',
					name: 'sermon-series',
					component: SermonSeries
				},
				{
					path: 'series/:id',
					name: 'view-sermon-series',
					component: ViewSermonSeries,
					props: true
				},
				{
					path: '',
					redirect: 'current-series'
				}
			]
		},
		{
			path: '/sermon/:id',
			name: 'view-sermon',
			component: ViewSermon,
			props: true
		},
		{
			path: '/blog',
			name: 'blog',
			component: Blog
		},
		{
			path: '/blog/:id',
			name: 'blog-post',
			component: BlogPost,
			props: true
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: 'about' */ './views/About.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			beforeEnter(to, from, next) {
				if (store.state.auth.user) {
					next('/profile')
				} else {
					next()
				}
			}
		},
		// auth
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/admin',
			component: Admin,
			meta: {
				requiresAuth: true
			},
			children: [
				{
					path: 'dashboard',
					name: 'admin',
					component: AdminDashboard
				},
				{
					path: 'pages',
					name: 'admin-pages',
					component: AdminPages
				},
				{
					path: 'posts',
					name: 'admin-posts',
					component: AdminPosts
				},
				{
					path: 'sermons',
					component: AdminSermons,
					children: [
						{
							path: 'series',
							name: 'admin-sermon-series',
							component: AdminSermonSeriesTab
						},
						{
							path: 'sermons',
							name: 'admin-sermons',
							component: AdminSermonsTab
						},
						{
							path: '',
							redirect: 'series'
						}
					]
				},
				{
					path: 'users',
					name: 'admin-users',
					component: AdminUsers,
					meta: {
						requiresAdmin: true
					}
				},
				{
					path: '',
					redirect: 'dashboard'
				}
			]
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

router.beforeEach((to, from, next) => {
	const currentUser = store.state.auth.user
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
	const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

	if (requiresAdmin && currentUser && currentUser.role !== 'admin') {
		next('/admin')
	} else if (requiresAdmin && !currentUser) {
		next('/login')
	} else if (requiresAuth && !currentUser) {
		next('/login')
	} else {
		next()
	}
})

export default router
