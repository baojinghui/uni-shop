<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <button @click="getUserInfo" type="primary" class="login-btn">一键登录</button>
    <text class="tips-text">登陆后享尽更多权益</text>
  </view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {
      };
    },
    computed:{
      ...mapState("m_user",['redirectInfo'])
    },
    methods: {
      //映射更新用户信息的函数
      ...mapMutations('m_user',['updateUserInfo','updataToken','updateRedirectInfo']),
      //用户授权后获取用户的基本型信息
      async getUserInfo() {
        const userMsg = await uni.getUserProfile({
          desc: '授权登录',
        }).catch(err => err)
        // 取消授权
        if (userMsg.length === 1) return uni.$showTip('取消授权请重试')
        //授权成功，解构出用户信息，向vuex中保存
        if (userMsg.length === 2) {
          const {userInfo} = userMsg[1]
          this.updateUserInfo(userInfo)
          // 发请求获取token
          const {encryptedData,iv,rawData,signature} = userMsg[1]
          this.getToken({encryptedData,iv,rawData,signature})
        }
      },
      async getToken(info) {
        //获取code值
        const res = await uni.login().catch(err => err)
        //login失败就未登录
        if (res.length==1||res[1].errMsg !== "login:ok") return uni.$showTip('登陆失败')
        //登陆成功
        if (res[1].errMsg === "login:ok") {
          //得到登陆后返回的code
          let {code} = res[1]
          const query={...info, code}
          //发请求获取token
          const {data:result}= await uni.$http.post('/api/public/v1/users/wxlogin',query)
          if(result.meta.status==200||result.meta.status==400){
            //把token保存到vuex中
            this.updataToken(result.meta.msg)
            //判断是否是从购物车页面登陆的,是的话返回购物车
            this.navigateBack()
          }
        }
      },
      //登陆后跳转回购物车
      navigateBack(){
        if(this.redirectInfo&&this.redirectInfo.openType==="switchTab"){
          uni.switchTab({
            url:this.redirectInfo.from,
            complete:()=>{
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    },
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 40px;
      background-color: #f8f8f8;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 100%;
      transform: translateY(50%);
    }

    .login-btn {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    .tips-text {
      font-size: 12px;
      color: grey;
    }
  }
</style>
