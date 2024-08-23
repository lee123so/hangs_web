import Statics from "@/services/service";
import store from "@/store";

export const auth = (to, from, next) => {
        const token = store.state.token
    if (!token) {
        alert('접근 권한이 없습니다.')
        return next('/login');
    }

    return next();
}
export const loginCheck = (to, from, next) => {
    const token = store.state.token
    if (token) {
        alert('이미 로그인 되어있는 상태입니다.')
        console.log(store.state.token)
        return next('/dashboard');
    }

    return next();
}
