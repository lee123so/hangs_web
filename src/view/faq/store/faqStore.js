import {faqDelete, faqDeleteMulti, faqDetailList, faqRegi, faqUpdate} from "@/api";
import {router} from "@/router/router";


const faqStore = {
    namespaced: true,
    state: {
        faq: {}


    },
    getters: {
        GE_POST_LIST: state => state.postList
    },
    mutations: {
        DETAIL_LIST:  (state, payload) => {
            state.faq = payload
        }
    },
    actions: {
        async FAQ_REG ({ commit },payload) {
            const {data} = await faqRegi(payload)
            alert('성공적으로 FAQ를 등록 하였습니다.')
            router.replace('/faq')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async FAQ_DEL ({ commit },payload) {
            const {data} = await faqDelete(payload)
            alert('성공적으로 FAQ를 삭제 하였습니다.')
            router.replace('/faq')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async FAQS_DEL ({ commit },payload) {
            const {data} = await faqDeleteMulti(payload)
            location.reload()
            alert('성공적으로 FAQ를 삭제 하였습니다.')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async FAQ_DETAIL_LIST ({ commit },payload) {
            const {data} = await faqDetailList(payload)
            console.log(data)
            commit('DETAIL_LIST', data.faq_data)
            return data.faq_data
        },
        async FAQ_UPDATE ({ commit },payload) {
            const {data} = await faqUpdate(payload)
            alert('성공적으로 FAQ를 수정 하였습니다.')
            router.replace('/faq')
            console.log(data)
            commit('DETAIL_LIST', data.faq_data)
            return data.faq_data
        }
    }
}
export default faqStore
