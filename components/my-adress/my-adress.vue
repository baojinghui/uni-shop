<template>
  <view>
    <!-- 选择收货地址 -->
    <view class="adress-change-box" v-if="JSON.stringify(address)==='{}'">
      <button @click="chooseAdress" type="primary" size="mini" class="adressBtn">请选择收货地址</button>
    </view>
    <!-- 展示具体的收货地址 -->
    <view class="adressInfo" v-else @click="chooseAdress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">
            收货人：{{address.userName}}
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">
            电话：{{address.telNumber}}
          </view>
          <uni-icons type="arrowright" size="17"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址：
        </view>
        <view class="row2-right">
          {{addressStr}}
        </view>
      </view>
    </view>

    <!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class="adress-border"></image>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-adress",
    data() {
      return {
        // address:{}
      };
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addressStr'])
    },
    methods: {
      //解构出把地址提交给仓库的方法
      ...mapMutations('m_user', ['updsteAddress']),
      //获取地址信息，提交给仓库
      async chooseAdress() {
        //解构出错误对象和成功对象
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        //如果用户授并选择后调用
        if (err === null && succ.errMsg === "chooseAddress:ok")
          this.updsteAddress(succ)
      },
    }
  }
</script>

<style lang="scss">
  // 最下的边框
  .adress-border {
    width: 100%;
    height: 10px;
  }

  // 没有展示用户地址前的的默认按钮
  .adress-change-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // 详细的收货地址
  .adressInfo {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        justify-content: space-between;
      }
    }

    .row2 {
      display: flex;
      // justify-content: space-between; 
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }
    }
  }
</style>
