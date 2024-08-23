export function formatDate(value) {
    const date = new Date(value);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    const day = date.getDate();
    let hours = date.getHours();
    hours = hours > 9 ? hours : `0${hours}`;
    const minutes = date.getMinutes();
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}


// 매장번호 자동변환 필터

export function formatStorePhoneNumber(phoneNumber) {
    const digitsOnly = phoneNumber.replace(/[^0-9]/g, '');
    console.log(digitsOnly)
    let formattedValue = '';
    if (digitsOnly.length <= 2) {
        formattedValue = digitsOnly;
    } else if (digitsOnly.slice(0, 2) === '02') {
        console.log('1')
        formattedValue = `${digitsOnly.substr(0, 2)}-${digitsOnly.substr(2, 4)}-${digitsOnly.substr(6)}`;
    } else {
        console.log('2')
        formattedValue = `${digitsOnly.substr(0, 3)}-${digitsOnly.substr(3, 3)}-${digitsOnly.substr(6)}`;
    }
    // else {
    //     console.log('3')
    //     formattedValue = `${digitsOnly.substr(0, 2)}-${digitsOnly.substr(2)}`;
    // }

    return formattedValue;
}

// 핸드폰번호 자동변환 필터
export function formatPhoneNumber(phoneNumber,maxLength) {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    return digitsOnly;
}

export const removeNonNumericAndHyphen = (str) => {
    return str.replace(/[^\d-]/g, '');
}
// 주소 받아오는 함수
export const execDaumPostcode = (ref) => {
    const element_wrap = document.getElementById('address_modal')
    return new Promise((resolve) => {
        let address = ''
        let address_detail = ''
        new window.daum.Postcode({
            oncomplete: (data,) => {
                if (address_detail !== "") {
                    address_detail = "";
                }
                if (data.userSelectedType === "R") {
                    // 사용자가 도로명 주소를 선택했을 경우
                    address = data.roadAddress;
                } else {
                    // 사용자가 지번 주소를 선택했을 경우(J)
                    address = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if (data.userSelectedType === "R") {
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                        address_detail += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== "" && data.apartment === "Y") {
                        address_detail +=
                            address_detail !== "" ? `, ${data.buildingName}` : data.buildingName;
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (address_detail !== "") {
                        address_detail = `(${address_detail})`;
                    }
                } else {
                    address_detail = "";
                }
                // 우편번호를 입력한다.
                let post_code = data.zonecode;
                // address, address_detail, post_code를 resolve하여 반환한다.
                resolve({address, address_detail, post_code});
            },
        }).embed(element_wrap);
    });
}
export const formatCurrency = (number) => {
    const formattedNumber = new Intl.NumberFormat('ko-KR', {style: 'currency', currency: 'KRW'}).format(number);
    return formattedNumber;
}

//대쉬보드 월별 매출 필터함수
export const generateMonthlyData = (data) => {
    const monthlyData = Array.from({length: 12}, (_, index) => {
        const month = index + 1;
        const foundData = data.find(item => item.month === month);

        if (foundData && foundData.sum) {
            const sum = parseInt(foundData.sum);
            const formattedSum = sum.toLocaleString();
            return {month, sum: formattedSum};
        } else {
            return {month, sum: '0'};
        }
    });

    return monthlyData;
};

//value 가 없으면 키 값 삭제
export function removeFieldIfEmpty(payload) {
    for (let key in payload) {
        if (payload.hasOwnProperty(key) && payload[key] === "") {
            delete payload[key];
        }
    }
    return payload
}

//table
export const applyLineBreak = (data) => {
    if (typeof data === 'string' && (data.includes('오전') || data.includes('오후'))) {
        return data.replace('오전', '<br>오전').replace('오후', '<br>오후');
    }
    return data;
}
