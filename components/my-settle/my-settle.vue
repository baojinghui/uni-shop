<template>
  <view class="my-settle">
    <!-- 全选 -->
    <label class="radio" @click="allCheckHandle">
      <radio color="#c00000" :checked="allChecked" /><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{allPrice}}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">
      结算({{checkCount}})
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-settle",
    computed: {
      ...mapGetters('m_cart', ['checkCount', 'allChecked', 'allPrice']),
      ...mapGetters('m_user', ['addressStr']),
      ...mapState('m_user', ['token']),
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return ({
        //倒计时
        seconds: 3,
        //定时器
        timer: null
      })
    },
    methods: {
      ...mapMutations('m_cart', ['checkedOrFanxuan']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      //全选或取消全部选
      allCheckHandle() {
        this.checkedOrFanxuan(!this.allChecked)
      },
      //点击结算按钮
      settlement() {
        //如果全选的商品数为0
        if (!this.checkCount) return uni.$showTip('请求选择要结算的商品!')
        //判断是否填写了收货地址
        if (!this.addressStr) return uni.$showTip('请选择收货地址!')
        //判断用户是否登录
        if (!this.token)
          //弹出提示3秒后自动跳转
          return this.delayNavigate()
        //登陆后再次点击开始创建支付订单
        this.payOrder()
      },
      //倒计时器
      delayNavigate() {
        //重置秒数
        this.seconds = 3
        //显示带有倒计时的弹窗
        this.showTips(this.seconds)
        this.timer = setInterval(() => {
          //当为0时跳转页面
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })
            return
          }
          this.seconds--
          this.showTips(this.seconds)
        }, 1000)
      },
      //点击结算时,没登陆,展示跳转倒计时
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请先登录!' + n + '秒后跳转到登录页',
          mask: true,
          duration: 1500
        })
      },
      //微信支付
     async payOrder() {
        //1,创建订单
        //1.1组织订单对象
        const orderInfo = {
          order_price: 0.01, //this.allPrice商品总价
          consignee_addr: this.addressStr, //收货地址
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))}
          //1.2发起请求创建订单
       const {data:res}= await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
      if(res.meta.status!==200) return uni.$showTip('创建订单失败')
      //1.3得到相应的订单编号
      const orderNum=res.message.order_number
      //2订单预支付
      //2.1发起请求获取订单信息
      const {data:res2}= await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_name:orderNum})
      console.log(res2);
      if(res2.meta.status!==200) return uni.$showTip('预付订单生成失败')
      const payInfo=res2.message.pay
      },
    },
  }
</script>

<style lang="scss">
  .my-settle {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 999;
    background-color: aqua;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    font-size: 14px;
    padding-left: 5px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount-box {
      .amount {
        color: #c00000;
        font-weight: bold;
      }
    }

    .btn-settle {
      background-color: #c00000;
      color: white;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      min-width: 100px;
      text-align: center;
    }
  }
</style>
