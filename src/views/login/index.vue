<template>
    <div class="login">
        <div>
            <!-- 头部导航 NavBar-->
            <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
            <!-- 登录主体 -->

            <div class="container">
                <div class="title">
                    <h2 style="font-family:FangSong">手机号登录</h2>
                    <p>未注册的手机号登录将自动注册</p>
                </div>

                <div class="form">
                    <div class="form-item1 item">
                        <input v-model="mobile" type="text" placeholder="请输入手机号码">
                    </div>
                    <div class="form-item2 item">
                        <input v-model="picCode" type="text" placeholder="请输入图形验证码">
                        <img v-show="picUrl" :src="picUrl" alt="" @click="clickGetCode">
                    </div>
                    <div class="form-item3 item">
                        <input v-model="msgCode" type="text" placeholder="请输入短信验证码">
                        <button @click="getMsgCode">
                            {{ totalSecond === second ? '获取验证码' : `重新发送${second}s` }}
                        </button>
                    </div>
                </div>

            </div>

            <!-- 登录按钮 -->
            <div class="footer">
                <button @click="clickLogin">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getPic, getMsg, login } from '@/api/login'
import { Toast } from 'vant'

export default {
    name: 'LoginIndex',
    data() {
        return {
            picUrl: '',//验证码url
            picKey: '',//验证码的key,将来用于校验验证码是否输入正确
            picCode: '',//输入的图片验证码
            mobile: '',//输入的手机号码，用于验证
            msgCode: '',//短信验证码
            timerOut: null,//点击更新图片验证码，为其实现防抖
            timerInter: null,//获取短信验证码，为其实现节流
            totalSecond: 60,
            second: 60,

        }

    },

    methods: {
        //获取图形验证码
        async getPicCode() {
            const res = await getPic()
            // console.log(res);
            this.picUrl = res.data.base64
            this.picKey = res.data.key
        },
        //点击刷新图片验证码
        clickGetCode() {
            // 实现防抖
            clearTimeout(this.timerOut)
            this.timerOut = setTimeout(() => {
                this.getPicCode()
                clearTimeout(this.timerOut)
                this.timerOut = null
            }, 300);
        },
        //点击获取短信验证码
        async getMsgCode() {
            //获取短信验证码之前先校验手机号和验证码
            if (this.checkFn()) {
                if (!this.timerInter && this.second == this.totalSecond) {

                    //发送请求，请求短信验证码
                    await getMsg(this.picCode, this.picKey, this.mobile)
                    Toast('短信发送成功')

                    //开启倒计时
                    this.timerInter = setInterval(() => {
                        this.second--
                        if (this.second === 0) {
                            clearInterval(this.timerInter)
                            this.second = this.totalSecond//重置秒数
                            this.timerInter = null//重置定时器id
                        }
                    }, 1000)
                }
            } else {
                return
            }

        },
        //校验手机号码以及图片验证码
        checkFn() {
            if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
                Toast('请输入正确的手机号码')
                return false
            }
            if (!/^\w{4}$/.test(this.picCode)) {
                Toast('请输入正确的图片验证码')
                return false
            }
            return true
        },
        //登录请求
        async clickLogin() {
            if (!this.checkFn()) {
                return
            }
            if (!/^\d{6}$/.test(this.msgCode)) {
                Toast('短信验证码错误')
                return
            }
            const res = await login(this.mobile, this.msgCode)
            console.log(res);
            this.$store.commit('user/setUserInfo', res.data)
            // 判断有无回跳地址
            const url = this.$route.query.backUrl || '/'
            this.$router.replace(url)
            Toast('登录成功')
        }

    },
    created() {
        this.getPicCode()
    },
    destroyed() {
        //离开组件后清除定时器
        clearInterval(this.timerInter)
    }
}
</script>

<style scoped>
.container {
    margin: 10px;
    padding: 20px;
}

.title {
    margin: 20px 0;
}

.title p {
    color: darkgrey;
}

.item {
    margin: 20px 0;
}

.item input {
    border-radius: 6px;
    height: 30px;
}

.form-item2,
.form-item3 {
    overflow: hidden;
    line-height: 30px;
}

.form-item2 input,
.form-item3 input {
    float: left;
}

.form-item2 img {
    width: 110px;
    height: 20px;
    float: right;
}

.form-item3 button {
    height: 30px;
    float: right;
    border-radius: 5px;
}

.footer {
    text-align: center;
    padding: 0 30px;
}

.footer button {
    width: 100%;
    height: 30px;
    border-radius: 8px;
    background-color: #007BFF;
}
</style>