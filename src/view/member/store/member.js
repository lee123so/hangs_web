import {faqDetailList, memberDelete, memberDetailList, memberRegi, memberUdt, noticeDelete, tableList} from "@/api";
import {router} from "@/router/router";
import {useRouter} from "vue-router";

const memberStore = {

    namespaced: true,
    state: {
        member: []


    },
    getters: {
        GE_POST_LIST: state => state.postList
    },
    mutations: {
        MEMBER_LIST: async (state, payload) => {
            state.member = await payload
        }
    },
    actions: {
        async MEMBER_REGI ({ commit },payload) {
            const {data} = await memberRegi(payload)
            router.go(-1)
            alert('성공적으로 등록 처리 하였습니다.')
            router.replace('/member')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async MEMBER_UDT ({ commit },payload) {
            const {data} = await memberUdt(payload)
            router.replace('/member')
            alert('성공적으로 회원정보를 수정 하였습니다.')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async MEMBER_DETAIL_LIST ({ commit },payload) {
            const {data} = await memberDetailList(payload)
            console.log(data)
            // commit('DETAIL_LIST', data.faq_data)
            return data.admin_user_info_detail
        },
        async MEMBER_DEL ({ commit },payload) {
            const {data} = await memberDelete(payload)
            router.replace('/member')
            alert('성공적으로 탈퇴 처리 하였습니다.')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
    }
}
export default memberStore
