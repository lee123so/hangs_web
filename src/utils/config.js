//글자 제한 전역 변수
export const config = {
    name: 11,       //이름
    email: 254,      //이메일
    address: 30,    //주소
    address_detail: 30, // 상세 주소
    password: 20,   //패스워드
    phone: 16,      //핸드폰
    title: 255,      //textarea 제목
    content: 255,   //textarea 내용
    shop_name: 20,  // 점포명
    pay: 8,         // 돈
    // ...기타 설정 정보
};

export const options = {
    service_options: [
        {value: "", label: '전체'},
        {value: 1, label: '베이직 (3개월)'},
        {value: 2, label: '스탠다드 (6개월)'},
        {value: 3, label: '프리미엄 (12개월)'},
    ],
    options: [
        {value: "card", label: '카드'},
        {value: "trans", label: '계좌이체'},
        {value: "untrt", label: '미처리'},
    ],
    search_service_options: [
        {value: 1, label: 'o'},
        {value: 0, label: 'x'},
    ],
    result_options: [
        {value: 0, label: '미처리'},
        {value: 1, label: '처리'},
    ],
    category_options:[
        { value: '1', label: '회원관련' },
        { value: '2', label: '스탬프' },
        { value: '3', label: '쿠폰' },
        { value: '4', label: 'QR코드' }
    ],
}
