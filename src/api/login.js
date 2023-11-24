import request from '@/utils/request'

//获取图片验证码
export const getPic = () => {
    return request.get('/captcha/image')
}

//获取短信验证码
export const getMsg = (captchaCode, captchaKey, mobile) => {
    return request.post('/captcha/sendSmsCaptcha',{
        form:{
            captchaCode,
            captchaKey,
            mobile
        }
    })
}

//登录请求
export const login = (mobile,smsCode) => {
    return request.post('/passport/login',{
        form:{
            isParty:false,
            partyData:{},
            mobile,
            smsCode
        }
    })
}

