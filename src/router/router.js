import { createWebHistory, createRouter } from "vue-router";
import {loginCheck,auth} from "@/middlewares/checkAuth";
const routes = [

    {
        path: "/",
        name: "index",
        component: () => import('@/view/index/IndexView.vue')
    },
    {
        path: "/serviceterms",
        name: "serviceterms",
        component: () => import('@/view/terms/ServiceTermsView.vue')
    },
    {
        path: "/locationterms",
        name: "locationterms",
        component: () => import('@/view/terms/LocationTermsView.vue')
    },
    {
        path: "/privacypolicy",
        name: "privacypolicy",
        component: () => import('@/view/terms/PrivacyPolicyView.vue')
    },
    {
        path: "/login",
        name: "login",
        component: () => import('@/view/login/LoginView.vue'),
        beforeEnter:loginCheck,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import('@/components/layout/LayoutNavibar.vue'),
        beforeEnter:auth,
        children:[
            {//==============대쉬보드==============
                path: "/dashboard",
                name: "dashboard",
                component: () => import('@/view/dashboard/DashBoardView.vue')
            },
            {//==============대쉬보드==============
                path: "/dashboard/map",
                name: "dashboard_map",
                component: () => import('@/view/dashboard/DashboardFullMapView.vue')
            },
            {//==============회원정보==============
                path: "/member",
                name: "member",
                component: () => import('@/view/member/MemberView.vue')
            },
            {
                path: "/member/detail/:id",
                name: "member_detail",
                component: () => import('@/view/member/MemberDetailView.vue')
            },
            {
                path: "/member/registration",
                name: "member_registration",
                component: () => import('@/view/member/MemberRegiView.vue')
            },
            {//==============서비스==============
                path: "/service",
                name: "service",
                component: () => import('@/view/service/ServiceView.vue')
            },
            {
                path: "/service/permit/:id",
                name: "service_permit",
                component: () => import('@/view/service/ServicePermitDetailView.vue')
            },
            {
                path: "/service/user",
                name: "service_user",
                component: () => import('@/view/service/ServiceUserView.vue')
            },
            {
                path: "/service/user/detail/:id",
                name: "service_user_detail",
                component: () => import('@/view/service/ServiceUserDetailView.vue')
            },
            {
                path: "/service/user/qrcode/:id",
                name: "service_qr",
                component: () => import('@/view/service/components/ServiceQrPrint.vue')
            },
            {
                path: "/service/test",
                name: "service_test",
                component: () => import('@/components/common/CommQrComtest.vue')
            },

            {//==============공지사항==============
                path: "/notice",
                name: "notice",
                component: () => import('@/view/notice/NoticeView.vue')
            },
            {
                path: "/notice/registration",
                name: "notice_registration",
                component: () => import('@/view/notice/NoticeRegiView.vue')
            },
            {
                path: "/notice/detail/:id",
                name: "notice_detail",
                component: () => import('@/view/notice/NoticeDetailView.vue')
            },
            {//==============faq==============
                path: "/faq",
                name: "faq",
                component: () => import('@/view/faq/FaqView.vue')
            },
            {
                path: "/faq/detail/:id",
                name: "faq_detail",
                component: () => import('@/view/faq/FaqDetailView.vue')
            },
            {
                path: "/faq/registration",
                name: "faq_registration",
                component: () => import('@/view/faq/FaqRegiView.vue')
            },
            {//==============문의사항==============
                path: "/inquiry",
                name: "inquiry",
                component: () => import('@/view/inquiry/InquiryView.vue')
            },
            {
                path: "/inquiry/detail/:id",
                name: "inquiry_detail",
                component: () => import('@/view/inquiry/InquiryDetail.vue')
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: "not-found",
        component: () => import('@/components/common/Comm404.vue')
    },


];

export const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth'
            }
        } else {
            // console.log(to.name)
            return { top: 0 };
        }
    }
});

