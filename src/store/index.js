import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import search from './search'
import detail from './detail'
import addcartsuccess from './addcartsuccess'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        addcartsuccess,
        shopcart,
        user,
        trade,
    }
})
