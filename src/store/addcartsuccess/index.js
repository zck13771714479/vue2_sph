import {reqAddCart} from '@/api/request'
const actions ={
    async addOrUpdateCart(context,{skuId,skuNum}){
        let result = await reqAddCart(skuId,skuNum);
        if(result.code ==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'));
        }
    }
};
const state ={};
const mutations ={};
const getters ={};

export default {
    namespaced:true,
    actions,
    state,
    mutations,
    getters
}