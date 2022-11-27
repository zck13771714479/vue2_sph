import { reqAddress,reqOrder } from '@/api/request'
const actions = {
    // 获取地址
    async getAddress(context) {
        let result = await reqAddress();
        if(result.code == 200){
            context.commit('GETADDRESS',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('获取地址失败'));
        }
    },
    //获取交易页订单信息
   async getOrder(context){
        let result = await reqOrder();
        if(result.code ==200){
            context.commit('GETORDER',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('获取交易订单信息失败'));
        }
    }
};
const state = {
    addressList:[],
    order:{},
};
const mutations = {
    GETADDRESS(state,addressList){
        state.addressList = addressList;
    },
    GETORDER(state,order){
        state.order = order;
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