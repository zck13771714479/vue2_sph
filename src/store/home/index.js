import { reqBanner, reqCategoryList,reqFloorList } from '@/api/request.js'



const actions = {
    async getProductList(context) {
        let result = await reqCategoryList(); //await返回promise对象成功的结果属性值（promiseResult）
        // console.log(result.data);
        if (result.code == 200) {
            context.commit('CATEGORYLIST', result.data);
        }
    },
    async getBanner(context) {
        let result = await reqBanner();
        // console.log(result.data);
        if (result.code == 200) {
            context.commit('GETBANNER', result.data);
        }
    },
    async getFloorList(context) {
        let result = await reqFloorList();
        // console.log(result.data);
        if (result.code == 200) {
            context.commit('GETFLOOR', result.data);
        }
    }
};
const state = {
    categoryList: [],
    bannerList: [],
    floorList:[],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNER(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOOR(state,floorList){
        state.floorList = floorList;
    },
};
const getters = {};

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters,
}