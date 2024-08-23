import {
    dashboardAdminServiceList,
    dashboardCoupon, dashboardMonthPaid, dashboardServiceApp, dashboardServiceInquiry,
    dashboardShopList, dashboardStampCounter, dashboardTodayMonthPaid,
} from "@/api";
import {reactive, ref} from 'vue';
import {generateMonthlyData} from "@/utils/filters";
import {router} from "@/router/router";


const dashboardStore = {
    namespaced: true,
    state: {
        coupon: reactive([]),
        admin: reactive([]),
        month:[]
    },
    getters: {
        GE_POST_LIST: state => state.coupon
    },
    mutations: {
        COUPON_LIST: (state, payload) => {
            // console.log(payload.issued_y)
            state.coupon = [ payload.issued_y,payload.used_y]
        },
        ADMIN_LIST: (state, payload) => {
            console.log(state)
            state.admin = [
                {
                    data: [payload.admin_info, payload.admin_service_y]
                }
            ]
        },
        MONTH_COMMIT: (state, payload) => {
            console.log(state)
            state.month = generateMonthlyData(payload)
        }
    },
    actions: {
        async DASHBOARD_COUPON({commit}) {
            const {data} = await dashboardCoupon()
            await commit('COUPON_LIST', data.dashboard_coupons_info)
            return data.dashboard_coupons_info
        },
        async DASHBOARD_SERVICE_ADMIN({commit}) {
            const {data} = await dashboardAdminServiceList()
            await commit('ADMIN_LIST', data.dashboard_admin_info)
            return data.dashboard_admin_info
        },
        async DASHBOARD_SHOP({commit}) {
            const {data} = await dashboardShopList()
            // commit('DETAIL_LIST', data.faq_data)
            return data.dashboard_shop_location_info
        },
        async DASHBOARD_STAMP_COUNTER({commit}) {
            const {data} = await dashboardStampCounter()
            // commit('DETAIL_LIST', data.faq_data)
            return data.dashboard_stampcard_info
        },
        async DASHBOARD_SERVICE_APP({commit}) {
            const {data} = await dashboardServiceApp()
            // commit('DETAIL_LIST', data.faq_data)
            return data.dashboard_service_apply_info
        },
        async DASHBOARD_SERVICE_INQUIRY({commit}) {
            const {data} = await dashboardServiceInquiry()// commit('DETAIL_LIST', data.faq_data)
            return data.dashboard_inquiries_info
        },
        async DASHBOARD_MONTH_PAID({commit}) {
            const {data} = await dashboardMonthPaid()
            console.log(data)
            commit('MONTH_COMMIT', data.dashboard_monthly_info)
            return data.dashboard_monthly_info
        },
        async DASHBOARD_TODAY_MONTH_PAID({commit}) {
            const {data} = await dashboardTodayMonthPaid()
            console.log(data)
            // commit('MONTH_COMMIT', data.dashboard_monthly_info)
            return data.dashboard_shop_location_info
        },
    }
}
export default dashboardStore
