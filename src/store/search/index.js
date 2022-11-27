import { reqSearchList } from '@/api/request'

const actions = {
    async getSearchList(context, params = {}) {
        let result = await reqSearchList(params);
        // console.log(params);
        // console.log(result);
        if (result.code == 200) {
            context.commit('GETSEARCHLIST', result.data);
        }
    }
};
const state = {
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const getters = {
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    pageNo() {
        return state.searchList.pageNo;
    },
    pageSize() {
        return state.searchList.pageSize;
    },
    total() {
        return state.searchList.total;
    },
    totalPages() {
        return state.searchList.totalPages;
    },
    trademarkList() {
        return state.searchList.trademarkList || [];
    }

};

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters,
}