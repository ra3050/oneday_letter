import axios from "axios";

export const AxiosConfig = {
    // baseURL: 'http://192.168.1.116:8428',
    baseURL: `https://www.open-myday.xyz/`,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    responseType: 'json',
    responseEncoding: 'json'
}

export const Axios = axios.create(AxiosConfig);

export const req_userInfo = async(props, callback) => {
    const signInfo = props
    let value
    value = await Axios.post('/m/userInfo', signInfo, { withCredentials: true }).then(req => {
        console.log('유저 정보 가져오기')

        return req.data
    })

    callback(value);
}

/**
 * 회원가입 API
 * @param {{nick, email, password, phone1, phone2, phone3}등, 회원가입에 필요한 데이터를 받습니다} props 
 */
export const req_signup = async(props, callback) => {
    const signInfo = props
    let value
    value = await Axios.post('/m/signUp', signInfo, { withCredentials: true }).then(req => {
        console.log('회원가입API 실행')
        console.log(req.data)
        return req.data
    }).catch(error => {
        console.log(error);
    })

    callback(value)
}

export const req_socialCheck = async(props, callback) => {
    const signInfo = props
    let value
    value = await Axios.post('/m/socialCheck', signInfo, { withCredentials: true }).then(req => {
        console.log('회원가입API 실행')
        console.log(req.data)
        return req.data
    }).catch(error => {
        console.log(error);
    })

    callback(value)
}

export const req_socialNickCheck = async(props, callback) => {
    const signInfo = props
    let value
    value = await Axios.post('/m/socialNcikCheck', signInfo, { withCredentials: true }).then(req => {
        console.log('회원가입API 실행')
        console.log(req.data)
        return req.data
    }).catch(error => {
        console.log(error);
    })

    callback(value)
}

export const req_signout = async(props, callback) => {
    const signInfo = props
    let value
    value = await Axios.post('/m/signOutUser', signInfo, { withCredentials: true }).then(req => {
        console.log('회원탈퇴')
        console.log(req.data)

        return req.data
    })

    callback(value);
}

/**
 * 카테고리 추가
 * @param {{mb_idx, new_category}, 카테고리 추가에 필요한 관심사, 성격을 입력받습니다} props 
 * @param {에러발생시 {errMessage, result: false}를 반환합니다} callback 
 */
export const req_signCategory = async(props, callback) => {
    const signInfo = props
    let value
    value = await Axios.post('/m/categorySignUp', signInfo, { withCredentials: true }).then(req => {
        console.log('카테고리API 실행')
        console.log(req.data)

        return req.data
    })

    callback(value);
}

export const req_signUserInfo = async(props, callback) => {
    const signInfo = props
    let value
    value = await Axios.post('/m/signUserInfo', signInfo, { withCredentials: true }).then(req => {
        console.log('유저정보 수정')
        console.log(req.data)

        return req.data
    })

    callback(value);
}

/**
 * 이메일, 닉네임 중복검사
 * @param {{email, nick}, 이메일과 닉네임의 중복검사를 시행합니다} props 
 * @param {에러발생시 {errMessage, result: false}를 반환합니다} callback 
 */
export const req_duplicate = async(props, callback) => {
    const signInfo = props
    let value
    value = await Axios.post('/m/duplicate', signInfo, { withCredentials: true }).then(req => {
        console.log('카테고리API 실행')
        console.log(req.data)

        return req.data
    })

    callback(value);
}

/**
 * 이메일 로그인 API
 * @param {{email, password}, 이메일과 패스워드를 받고 로그인을 시도합니다} props 
 * @param {에러발생시 {errMessage, result: false}를 반환합니다, 
 *         성공시 {mb_idx}를 반환합니다 해당 } callback 
 */
export const req_emailLogin = async(props, callback) => {
    const loginInfo = props
    let value
    value = await Axios.post('/m/emailLogin', loginInfo, { withCredentials: true }).then(req => {
        console.log('로그인API 실행')
        console.log(req.data)

        return req.data
    })

    callback(value);
}

export const req_letterInfo = async(callback) => {
    let value
    value = await Axios.post('/m/letterInfo').then(req => {
        console.log('편지 리스트API호출')

        return req.data
    })

    callback(value);
}

export const req_sendLetterInfo = async(props, callback) => {
    const userInfo = props;
    let value
    value = await Axios.post('/m/sendLetterInfo', userInfo).then(req => {
        console.log('보낸 편지 리스트호출 API')

        return req.data;
    })

    callback(value)
}

export const req_exchangeInfo = async(props, callback) => {
    const lt_idx = props
    let value
    value = await Axios.post('/m/exchangeInfo', lt_idx, { withCredentials: true}).then(req => {
        console.log('보낸 편지 답장호출 API')

        return req.data
    })

    callback(value);
}

export const req_postLetter = async(props, callback) => {
    const info = props;
    let value
    value = await Axios.post('/m/postLetter/', info, { withCredentials: true}).then(req => {
        console.log('편지 발송 API')
        
        return req.data;
    })

    callback(value);
}

export const req_receiveLetter = async(props, callback) => {
    const info = props;
    let value
    value = await Axios.post('/m/receiveLetter', info, { withCredentials: true}).then(req => {
        console.log('답장 발송 API')
        
        return req.data;
    })

    callback(value);
}

export const req_receiveCheck = async(props, callback) => {
    const info = props;
    let value
    value = await Axios.post('/m/receiveCheck', info, { withCredentials: true}).then(req => {
        console.log('편지를 보냈는지 확인하는 API')
        
        return req.data;
    })

    callback(value);
}

export const req_categoryCheck = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/categoryCheck', info, { withCredentials: true }).then(req => {
        console.log('카테고리를 체크하는 API')
        
        return req.data;
    })

    callback(value);
}


// 9월 26일 추가
export const req_removeLetter = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/removeLetter', info, { withCredentials: true }).then(req => {
        console.log('편지 지우기')
        
        return req.data;
    })

    callback(value);
}

export const req_removeExletter = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/removeExletter', info, { withCredentials: true }).then(req => {
        console.log('답장 삭제')
        
        return req.data;
    })

    callback(value);
}

export const req_removeBoastletter = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/removeBoastletter', info, { withCredentials: true }).then(req => {
        console.log('자랑하는편지 삭제')
        
        return req.data;
    })

    callback(value);
}

export const req_like = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/like', info, { withCredentials: true }).then(req => {
        console.log('편지 좋아요')
        
        return req.data;
    })

    callback(value);
}

export const req_likeCheck = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/likeCheck', info, { withCredentials: true }).then(req => {
        console.log('편지 좋아요 체크')
        
        return req.data;
    })

    callback(value);
}

export const req_boastList = async(callback) => {
    let value
    value = await Axios.get('/m/boastList', { withCredentials: true }).then(req => {
        console.log('자랑하는 편지 가져오기')

        return req.data;
    })

    callback(value);
}

export const req_balike = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/balike', info, { withCredentials: true }).then(req => {
        console.log('자랑하는 편지 체크')
        
        return req.data;
    })

    callback(value);
}

export const req_balikeCheck = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/balikeCheck', info, { withCredentials: true }).then(req => {
        console.log('자랑하는 편지 좋아요 체크')
        
        return req.data;
    })

    callback(value);
}

export const req_boastLetter = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/boastLetter', info, { withCredentials: true }).then(req => {
        console.log('자랑하는 편지 체크')
        
        return req.data;
    })

    callback(value);
}

export const req_boastCheck = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/boastCheck', info, { withCredentials: true }).then(req => {
        console.log('자랑하는 편지 체크')
        
        return req.data;
    })

    callback(value);
}

export const req_reportBoastLetter = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/reportBoastLetter', info, { withCredentials: true }).then(req => {
        console.log('자랑하는 편지 체크')
        
        return req.data;
    })

    callback(value);
}

export const req_reportLetter = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/reportLetter', info, { withCredentials: true }).then(req => {
        console.log('자랑하는 편지 체크')
        
        return req.data;
    })

    callback(value);
}

export const req_reportExLetter = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/reportExLetter', info, { withCredentials: true }).then(req => {
        console.log('자랑하는 편지 체크')
        
        return req.data;
    })

    callback(value);
}

export const req_FindEmailAuthSend = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/findEmailAuthSend', info, { withCredentials: true }).then(req => {
        console.log('이메일찾기')
        
        return req.data;
    })

    callback(value);
}

export const req_FindPasswordAuthSend = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/findPasswordAuthSend', info, { withCredentials: true }).then(req => {
        console.log('비밀번호 찾기 인증코드 전송')
        
        return req.data;
    })

    callback(value);
}

export const req_FindPasswordAuthCheck = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/findPasswordAuthCheck', info, { withCredentials: true }).then(req => {
        console.log('비밀번호 찾기 인증코드 유효성 확인')
        
        return req.data;
    })

    callback(value);
}

export const req_ChangePassword = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/changePassword', info, { withCredentials: true }).then(req => {
        console.log('비밀번호 변경요청')
        
        return req.data;
    })

    callback(value);
}

export const req_exchangeListing = async(props, callback) => {
    const info = props;

    let value
    value = await Axios.post('/m/exchangeListing', info, { withCredentials: true }).then(req => {
        console.log('답장리스트 요청')

        return req.data;
    })

    callback(value);
}
