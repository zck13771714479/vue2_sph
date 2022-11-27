import requests from './ajax'
import mockRequests from './mockAjax'
// 请求商品分类列表
export const reqCategoryList = () => {
    return requests.get('/product/getBaseCategoryList');
}
// 请求home页面大轮播图数据
export const reqBanner =()=>{
    return mockRequests.get('/banner');
}
// 请求楼层图数据
export const reqFloorList =()=>{
    return mockRequests.get('/floors');
}
// 请求搜索列表
export const reqSearchList = (params)=>{
    return requests({
        url:'/list',
        method:'POST',
        data:params,
    })
}
// 请求详情列表
export const reqDeatilList = (skuId)=>{
    return requests({
        url:`/item/${skuId}`,
        method:'GET'
    })
}

//告知服务器要添加到购物车的东西
export const reqAddCart=(skuId,skuNum)=>{
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'POST'
    })
}
// 获取购物车列表
export const reqCartList =()=>{
    return requests({
        url:'/cart/cartList',
        method:'GET'
    })
}
// 删除购物车的商品
export const reqDeleteCartList=(skuId)=>{
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'DELETE'
    })
}
// 改变购物车选中状态
export const reqCheckedState = (skuID,isChecked)=>{
    return requests({
        url:`/cart/checkCart/${skuID}/${isChecked}`,
        method:'GET'
    })
}
//获取验证码
export const reqRegisterCode = (phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'GET'
    })
}
//提交注册信息
export const postRegisterInfo = (phone,password,code)=>{
    return requests({
        url:`/user/passport/register`,
        method:'POST',
        data:{
            phone,
            password,
            code
        }
    })
}
// 登录
export const reqUserLogin=(phone,password)=>{
    return requests({
        url:`/user/passport/login`,
        method:'POST',
        data:{
            phone,
            password
        }
    })
}
// 获取用户信息
export const reqUserInfo = ()=>{
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'GET'
    })
}
// 退出登录
export const reqLogout =()=>{
    return requests({
        url:'/user/passport/logout',
        method:'GET',
    })
}
// 获取地址
export const reqAddress=()=>{
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'GET',
    })
}
//获取交易页订单信息
export const reqOrder=()=>{
    return requests({
        url:'/order/auth/trade',
        method:'GET',
    })
}
// 提交订单
export const reqSubmitOrder=(tradeNo,data)=>{
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'POST',
        data,
    })
}
// 获取支付信息
export const reqPayInfo=(orderId)=>{
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'GET'
    })
}
// 查询支付状态
export const reqPayState=(orderId)=>{
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'GET'

    })
}
// 获取我的订单列表
export const reqOrderList = (page,limit)=>{
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'GET',
    })
}