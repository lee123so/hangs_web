import {createStore} from "vuex";

//api
import {loginUser, logoutUser, tableList, tablePagination, tableSerach} from "@/api";


//모듈
import memberStore from "@/view/member/store/member";
import faqStore from "@/view/faq/store/faqStore";
import noticeStore from "@/view/notice/store/notice";
import serviceStore from "@/view/service/store/service";
import dashboardStore from "@/view/dashboard/store/dashboard";
import inquiryStore from "@/view/inquiry/store/inquiryStore";
import Statics from "@/services/service";
import {router} from "@/router/router";


export default createStore({
    state: {
        token: Statics.getValueOfCookie('token') || '',
        table:{},
        value:{}
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload
        },
        removeToken(state) {
            state.token = ''
        },
        TABLES_LIST:  (state, payload) => {
            console.log(state)
            state.table = payload
        },
        SEARCH_VALUE:  (state, payload) => {
            console.log(state)
            state.value = payload
        }
    },
    actions: {
        async LOGIN({commit}, user_data) {
            const {data} = await loginUser(user_data);
            alert('환영합니다. 슈퍼 관리자님')
            router.push('/dashboard');
            commit('setToken', data.token)
            console.log(data.user_info.id)
             Statics.saveSetCookie('token',data.token)
             Statics.saveSetCookie('user_id',data.user_info.id.toString())

            return data;
        },
        async LOGOUT({commit}){
            const {data} = await logoutUser();
            commit('removeToken')
            Statics.removeCookie('token')
            Statics.removeCookie('user_id')
            alert('로그아웃 처리 되었습니다.')
            router.push('/login');
        },
        async TABLE_LISTS ({ commit },payload) {
            const {data} = await tableList(payload.url)
            commit('TABLES_LIST', data[payload.data_name] )
            return data[payload.data_name]
        },
        async TABLE_SEARCH ({ state, commit },payload) {
            const data = await tableSerach(payload,state.value)
            commit('TABLES_LIST', data.data[payload.data_name])
            commit('SEARCH_VALUE', payload)
            console.log(state.value)
            return data[payload.data_name]
        },
        async TABLE_PAGINATION ({ state,commit },payload) {
            const data = await tablePagination(payload,state.value.data)
            console.log(data)
            commit('TABLES_LIST', data[payload.data_name]||data[state.value.data_name])

        }
    },
    modules: {
        // 키: 값 형태로 저장됩니다.
        memberStore,
        faqStore,
        noticeStore,
        inquiryStore,
        serviceStore,
        dashboardStore

    }
})


