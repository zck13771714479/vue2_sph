import { reqCartList, reqDeleteCartList, reqCheckedState } from '@/api/request'

const actions = {
    async getCartList(context) {
        let result = await reqCartList();
        if (result.code == 200) {
            context.commit('GETCARTLIST', result.data);
        }
    },
    async deleteCartList(context, skuId) {
        let result = await reqDeleteCartList(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    async changeCheckedState(context, { skuId, isChecked }) {
        let result = await reqCheckedState(skuId, isChecked);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    deleteChecked(context) {
        let cartList = context.getters.cartList;
        let promiseAll = [];
        cartList.forEach(item => {
            if (item.isChecked == 1) {
                let promise = context.dispatch('deleteCartList', item.skuId);
                promiseAll.push(promise);
            }
        });
        return Promise.all(promiseAll);
    },
    updateCheckedAll(context, isChecked) {
        let cartList = context.getters.cartList;
        let promiseAll = [];
        cartList.forEach(item => {
            let promise = context.dispatch('changeCheckedState', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
const state = {
    cartListResult: [],
};
const mutations = {
    GETCARTLIST(state, cartListResult) {
        state.cartListResult = cartListResult;
    }
};
const getters = {
    cartList(state) {
        let tmp = state.cartListResult[0] || {};
        return tmp.cartInfoList || [];
    }
};

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters,
}