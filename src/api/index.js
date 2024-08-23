import axios from 'axios';
import {setInterceptors, setLoginInterceptors, setPathInterceptors} from "@/api/common/interceptors";


//========================axios 생성================================
// 토큰값이 필요없는 api
function createAxiosService() {
    const axiosService = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    });
    return setLoginInterceptors(axiosService)
}

//토큰값이 필요한 api
function createAxiosServiceWithAuth() {
    const axiosService = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    });
    return setInterceptors(axiosService);
}

function createAxiosServiceWithPath(path) {
    const axiosService = axios.create({
        baseURL: path,
    });
    return setPathInterceptors(axiosService);
}
//========================api 정의================================
const posts = createAxiosServiceWithAuth();
const axiosService = createAxiosService();
const pagination = createAxiosServiceWithPath()


//========================api 함수================================
// 로그인 api
export const loginUser = (userData) => {
    return axiosService.post('super-login', userData);
}
// 로그아웃 api
export const logoutUser = () => {
    return posts.post('super-admin-logout')
}

//table data 불러오는 공통 api
export const tableList = (url) => {
    return posts.get(url)
}

export const tableSerach = (payload,value) => {
    return posts.get(payload.path,{
        params:{
            page:payload.page,
            ...payload.data || value,
        }


    })
}
//table pagination 불러오는 공통 api
export const tablePagination = (payload,value) => {
    console.log(payload.path)
    console.log(payload.page)
    return pagination.get(payload.path,{
        params: {
            page:payload.page,
            ...value
        }

    })
}
//========================dashboard api================================
export const dashboardShopList = () => {
    return posts.get(`dashboard-shop`)
}
export const dashboardStampCounter = () => {
    return posts.get(`dashboard-shop`)
}
export const dashboardCoupon = () => {
    return posts.get(`dashboard-coupon`)
}
export const dashboardAdminServiceList = () => {
    return posts.get(`dashboard-admin`)
}
export const dashboardServiceApp = () => {
    return posts.get(`dashboard-service-apply`)
}
export const dashboardServiceInquiry = () => {
    return posts.get(`dashboard-inquiries`)
}
export const dashboardMonthPaid = () => {
    return posts.get(`dashboard-monthly-paid`)
}
export const dashboardTodayMonthPaid = () => {
    return posts.get(`admin-dashboard-sales`)
}


//========================member api================================
export const memberDetailList = (payload) => {
    return posts.get(`get-admin-user-detail/${payload}`)
}

export const memberDelete = (payload) => {
    return posts.post(`del-admin-user`,payload)
}
export const memberRegi = (payload) => {
    return posts.post(`admin-sign-up`, payload)
}
export const memberUdt = (payload) => {
    return posts.post(`admin-user-info-upt`, payload)
}
//========================faq api================================
export const faqRegi = (payload) => {
    return posts.post('faq-reg',payload)
}
export const faqDelete = (payload) => {
    return posts.post('faq-del',payload)
}
export const faqDeleteMulti = (payload) => {
    return posts.post('faq-multiple-del',payload)
}
export const faqDetailList = (payload) => {
    return posts.get(`admin-faq-list/${payload}`)
}
export const faqUpdate = (payload) => {
    return posts.post('faq-upt',payload)
}
//========================notice api================================

export const noticeRegi = (payload) => {
    return posts.post('notice-reg',payload)
}
export const noticeDetailList = (payload) => {
    return posts.get(`admin-notice-list/${payload}`)
}
export const noticeUpdate = (payload) => {
    return posts.post('notice-upt',payload)
}
export const noticeDelete = (payload) => {
    return posts.post('notice-del',payload)
}
export const noticeDeleteMulti = (payload) => {
    return posts.post('notice-multiple-del',payload)
}
//========================inquiry api================================
export const inquiryDetailList = (payload) => {
    return posts.get(`admin-inquiry-list/${payload}`)
}
export const inquiryUpdate = (payload) => {
    return posts.post('inquiry-upt',payload)
}

//========================service api================================

export const serviceDetailList = (payload) => {
    return posts.get(`service-apply-list/${payload}`)
}
export const serviceCancel = (payload) => {
    return posts.post('cancel-service',payload)
}
export const serviceApproval = (payload) => {
    return posts.post('service-in',payload)
}
export const serviceUdt = (payload) => {
    return posts.post('service-info-upt',payload)
}
export const serviceStamp = (payload) => {
    return posts.post('card-info',payload)
}
export const serviceShopDetail = (payload) => {
    return posts.get(`admin-user-detail/${payload}`)
}
