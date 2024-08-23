//아이디 유효성 검사
export function isIdValid(id) {
    const re = /^.{5,20}$/
    return re.test(id)

}

// 이름 유효성 검사
export function isNameValid(name) {
    const re = /^.{1,11}$/;
    return re.test(name)
}

// 매장 이름 유효성 검사
export function isStoreNameValid(name) {
    const re = /^.{1,20}$/;
    return re.test(name)
}


// 패스워드 유효성 검사
export function isPasswordValid(password) {
    const re = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return re.test(password)
}
// 패스워드 확인 유효성검사
export function isPasswordConfigValid(password, password_config) {
    if (password !== password_config) {
        return false
    } else {
        return true
    }
}
 // 매장 번호 유효성 검사
export function isStorePhoneValid(phone) {
    const re = /^(\d{2,3})(-)?(\d{3,4})(-)?(\d{4})$/;
    return re.test(phone)
}

// 핸드폰번호 유효성 검사
export function isPhoneValid(phone) {
    const re = /^\d{1,16}$/;
    return re.test(phone)
}

// 이메일 유효성 검사
export function isEmailValid(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email)
}

// export function isValid(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }
