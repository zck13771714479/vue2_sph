import { reqRegisterCode, postRegisterInfo, reqUserLogin, reqUserInfo, reqLogout } from '@/api/request'

const actions = {
    // 获取验证码
    async getCode(context, phone) {
        let result = await reqRegisterCode(phone);
        // console.log(result);
        if (result.code == 200) {
            context.commit('GETCODE', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取验证码失败'));
        }
    },
    // 提交注册
    async submitRegister(context, { phone, password, code }) {
        let result = await postRegisterInfo(phone, password, code);
        // console.log(result);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('注册提交失败'));
        }
    },
    // 登录
    async userLogin(context, { phone, password }) {
        let result = await reqUserLogin(phone, password);
        if (result.code == 200) {
            localStorage.setItem('TOKEN', result.data.token);
            context.commit('GETTOKEN', result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('登陆失败'));
        }
    },
    // 获取用户信息
    async getUserInfo(context) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            context.commit('GETUSERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取用户信息失败'));
        }
    },
    // 退出登录
    async userLogout(context) {
        let result = await reqLogout();
        if (result.code == 200) {
            context.commit('CLEARTOKEN');
            return 'ok';
        } else {
            return Promise.reject(new Error('退出登录失败'));
        }
    }

};
const state = {
    code: '',
    token: localStorage.getItem('TOKEN') || '',
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    GETTOKEN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEARTOKEN(state){
        state.token = '';
        state.userInfo = {};
        localStorage.removeItem('TOKEN');
    }

};
const getters = {};

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters,

}