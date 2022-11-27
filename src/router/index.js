import Vue from 'vue';
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter);


let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

let router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
    routes: [
        {
            name: 'home',
            path: '/home',
            component: () => { return import('@/pages/Home/Home.vue') },
            meta: { isShow: true },
        },
        {
            name: 'login',
            path: '/login',
            component: () => { return import('@/pages/Login/Login.vue') },
            meta: { isShow: false },
        },
        {
            name: 'register',
            path: '/register',
            component: () => { return import('@/pages/Register/Register.vue') },
            meta: { isShow: false },
            props: true,
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: () => { return import('@/pages/Search/Search.vue') },
            meta: { isShow: true },

        },
        {
            name: 'detail',
            path: '/detail/:skuId?',
            component: () => { return import('@/pages/Detail/Detail.vue') },
            meta: { isShow: true },

        },
        {
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: () => { return import('@/pages/AddCartSuccess/AddCartSuccess.vue') },
            meta: { isShow: true },

        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: () => { return import('@/pages/ShopCart/ShopCart.vue') },
            meta: { isShow: true },

        },
        {
            name: 'trade',
            path: '/trade',
            component: () => { return import('@/pages/Trade/Trade.vue') },
            meta: { isShow: true },
            beforeEnter(to, from, next) {
                if (from.path.indexOf('shopcart') !== -1) {
                    if (store.state.user.token && store.state.user.userInfo.name) {
                        next();
                    } else {
                        next(`/login?redirect=${from.path}`);
                    }
                } else {
                    next(false);
                }
            }

        },
        {
            name: 'pay',
            path: '/pay',
            component: () => { return import('@/pages/Pay/Pay.vue') },
            meta: { isShow: true },
            beforeEnter(to, from, next) {
                if (from.path.indexOf('trade') !== -1) {
                    next();
                } else {
                    next(false);
                }
            }
        },
        {
            name: 'paysuccess',
            path: '/paysuccess',
            component: () => { return import('@/pages/PaySuccess/PaySuccess.vue') },
            meta: { isShow: true },
            beforeEnter(to, from, next) {
                if (from.path.indexOf('pay') !== -1) {
                    next();
                } else {
                    next(false);
                }
            }
        },
        {
            name: 'center',
            path: '/center',
            component: () => { return import('@/pages/Center/Center.vue') },
            meta: { isShow: true },
            redirect: '/center/myorder',
            children: [
                {
                    name: 'myorder',
                    path: 'myorder',
                    component: () => { return import('@/pages/Center/MyOrder/MyOrder.vue') },
                    meta: { isShow: true },
                },
                {
                    name: 'grouporder',
                    path: 'grouporder',
                    component: () => { return import('@/pages/Center/GroupOrder/GroupOrder.vue') },
                    meta: { isShow: true },
                },
            ]
        },
        {
            //项目跑起来的时候，访问路由/，立马跳转到home
            path: '*',
            redirect: '/home',
        }

    ]
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        //已经登录
        if (to.path == '/login') {
            // 不允许回到登录路由
            next('/home');
        } else {
            // 要去其他地方
            if (name) {
                next();
            } else {
                try {
                    await store.dispatch('user/getUserInfo');
                    next();
                } catch (error) {
                    //有token,但是获取用户信息失败，说明token已经过期，要重新登陆
                    await store.dispatch('user/userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 游客身份不能去pay，paysuccess，trade，center
        if (to.path.indexOf('pay') !== -1) {
            next(false);
        } else if (to.path.indexOf('center') !== -1) {
            next(`/login?redirect=${to.path}`);
        } else {
            next();
        }
    }
})

router.afterEach((to, from) => {
    document.title = to.name;
})

export default router;

