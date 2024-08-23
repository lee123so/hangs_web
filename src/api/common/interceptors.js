import Statics from "@/services/service";
import store from "@/store";

export function setInterceptors(axiosService,token) {
    axiosService.interceptors.request.use(
        function (config) {
            config.headers.Authorization = `Bearer ${store.state.token}` ;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axiosService.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            const {data} = error.response
            console.log(error)
            if(error.response.status === 422){
                alert(`${data.result} 형식에 맞게 작성하였는지 확인 해주세요`)
            }else if (error.response.status === 404){
                alert(`알수없는 오류 ${error.response.status}`)
            }else if(error.response.data.result_code === 102){
                alert('서비스 이용중인 사용자가 아닙니다.')
            }
            return Promise.reject(error);
        }
    );

    return axiosService;
}
export function setLoginInterceptors(axiosService) {
    axiosService.interceptors.request.use(
        function (config) {
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axiosService.interceptors.response.use(
        function (response) {
            if(response.status === 204){
                return alert('존재하지 않는 아이디 입니다.')
            }else {
                console.log(response)
                return response
            }
        },
        function (error) {
            if(error.response.status === 401){
                return alert('비밀번호가 다릅니다.')
            }
        }
    );

    return axiosService;
}

export function setPathInterceptors(axiosService) {
    axiosService.interceptors.request.use(
        function (config) {
            config.headers.Authorization = `Bearer ${store.state.token}`

            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axiosService.interceptors.response.use(
        function (response) {
            console.log(response)
                return response.data
        },
        function (error) {
            console.log(error)
        }
    );

    return axiosService;
}
