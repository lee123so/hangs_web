import {
    faqDelete,
    faqDetailList,
    faqRegi,
    faqUpdate,
    noticeDelete, noticeDeleteMulti,
    noticeDetailList,
    noticeRegi,
    noticeUpdate
} from "@/api";
import {router} from "@/router/router";


const noticeStore = {
    namespaced: true,
    state: {
        faq: {}


    },
    getters: {
        GE_POST_LIST: state => state.postList
    },
    mutations: {
        DETAIL_LIST: (state, payload) => {
            state.faq = payload
        }
    },
    actions: {
        async NOTICE_REG({commit}, payload) {
            const {data} = await noticeRegi(payload)
            alert('성공적으로 공지사항을 등록 하였습니다.')
            router.replace('/notice')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async NOTICE_DEL({commit}, payload) {
            const {data} = await noticeDelete(payload)
            router.replace('/notice')
            alert('성공적으로 공지사항을 삭제 하였습니다.')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async NOTICES_DEL({commit}, payload) {
            const {data} = await noticeDeleteMulti(payload)
            location.reload()
            alert('성공적으로 공지사항을 삭제 하였습니다.')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async NOTICE_DETAIL_LIST({commit}, payload) {
            const {data} = await noticeDetailList(payload)

            console.log(data)
            return data.notice_data
        },
        async NOTICE_UPDATE({commit}, payload) {
            const {data} = await noticeUpdate(payload)
            alert('성공적으로 공지사항을 수정 하였습니다.')
            router.replace('/notice')
            console.log(data)
            return data.faq_data
        }
    }
}
export default noticeStore
