import {
    faqDelete,
    faqDetailList,
    faqRegi,
    faqUpdate,
    noticeDelete,
    noticeDetailList,
    noticeRegi,
    noticeUpdate, serviceApproval, serviceCancel, serviceDetailList, serviceUdt,serviceStamp
} from "@/api";
import {router} from "@/router/router";
import {serviceShopDetail} from "../../../api";


const serviceStore = {
    namespaced: true,
    state: {
        faq: {},
        qr_data: {},
        stamp:{}

    },
    getters: {
        GE_QR: state => state.qr_data.nfc_qr_id
        // GE_SHOP_NAME: state => state.qr_data.shop_name
    },
    mutations: {
        DETAIL_LIST: (state, payload) => {
            state.faq = payload
        },
        QR_DATA: (state, payload) => {
            state.qr_data = payload
        },
        STAMP_DATA: (state, payload) => {
            state.stamp = payload
        }
    },
    actions: {
        async SERVICE_APPROVAL({commit}, payload) {
            const {data} = await serviceApproval(payload)
            alert('성공적으로 승인 하였습니다.')
            router.replace('/service')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async SERVICE_UDT({commit}, payload) {
            c
            alert('성공적으로 등록/수정 하였습니다.')
            router.replace('/service')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async SERVICE_CANCEL({commit}, payload) {
            const {data} = await serviceCancel(payload)
            router.replace('/service')
            alert('성공적으로 이용해지 처리 하였습니다.')
            console.log(data)
            // commit('MEMBER_LIST', data[payload.data_name])
            // return data[payload.data_name]
        },
        async SERVICE_DETAIL_LIST({state, commit}, payload) {
            const {data} = await serviceDetailList(payload)
            commit('QR_DATA', data.admin_user_service_detail_info)
            console.log(data)
            return data.admin_user_service_detail_info
        },
        async SERVICE_STAMP_DETAIL({state, commit}, payload) {
            const {data} = await serviceStamp(payload)
            commit('STAMP_DATA', data.stamp_card_info)
            console.log(data)
            return data.stamp_card_info
        },
        async SERVICE_SHOP_DETAIL({state, commit}, payload) {
            const {data} = await serviceShopDetail(payload)
            console.log(data)
            return data.admin_user_info_detail
        }
    }
}
export default serviceStore
