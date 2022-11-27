import {reqDeatilList} from '@/api/request';
import {getUUID} from '@/utils/getUUid.js'
const actions={
    async getDetail(context,skuId){
        let result = await reqDeatilList(skuId);
        if(result.code == 200){
            context.commit('GETDETAIL',result.data);
        }
    }
};
const state={
    detailList:{},
    uuid_token:getUUID(),
};
const mutations={
    GETDETAIL(state,detailList){
        state.detailList = detailList || {};
    }
};
const getters={
    categoryView(state){
        return state.detailList.categoryView || {};
    },
    skuInfo(state){
        return state.detailList.skuInfo || {};
    },
    spuSaleAttrList(state){
        return state.detailList.spuSaleAttrList || [];
    }

};

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters,
}