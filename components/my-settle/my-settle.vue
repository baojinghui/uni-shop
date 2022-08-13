<template>
  <view class="my-settle">
    <!-- 全选 -->
      <label class="radio" @click="allCheckHandle">
        <radio  color="#c00000" :checked="allChecked"/><text>全选</text>
      </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{allPrice}}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle">
      结算({{checkCount}})
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    computed:{
      ...mapGetters('m_cart',['checkCount','allChecked','allPrice'])
    },
    data() {
      return {
        
      };
    },
    methods:{
      ...mapMutations('m_cart',['checkedOrFanxuan']),
      allCheckHandle(){
        this.checkedOrFanxuan(!this.allChecked)
      }
    },
  }
</script>

<style lang="scss">
.my-settle{
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
.radio{
  display: flex;
  align-items: center;
  } 
 .amount-box{
    .amount{
      color: #c00000;
      font-weight: bold;
    }
  }

 .btn-settle{
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