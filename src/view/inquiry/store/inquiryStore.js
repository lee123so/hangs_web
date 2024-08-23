import {
    faqDelete,
    faqDetailList,
    faqRegi,
    faqUpdate, inquiryDetailList, inquiryUpdate,
    noticeDelete,
    noticeDetailList,
    noticeRegi,
    noticeUpdate
} from "@/api";
import {router} from "@/router/router";


const inquiryStore = {
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
        async INQUIRY_DETAIL_LIST ({ commit },payload) {
            const {data} = await inquiryDetailList(payload)

            console.log(data)
            return data.inquiry_data
        },
        async INQUIRY_UPDATE ({ commit },payload) {
            const {data} = await inquiryUpdate(payload)
            alert('성공적으로 답변처리를 하였습니다.')
            router.replace('/inquiry')
            console.log(data)
            return data.faq_data
        }
    }
}
export default inquiryStore
