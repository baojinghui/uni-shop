<template>
  <!-- 购物车为空时 -->
  <view class="empty-cart" v-if="cart.length===0">
    <image src="/static/404_cloud.png" class="empty-img"></image>
    <text class="empty-text">空空如也</text>
  </view>
  <view class="cart-content" v-else>
    <!-- 买家地址区域 -->
    <my-adress></my-adress>
    <!-- 商品列表标题区 -->
    <view class="cart-title">
      <!-- 左侧图标 -->
      <uni-icons type="shop" size="17"></uni-icons>
      <!-- 右侧文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <block v-for="(item,index) in cart" :key="item.goods_id">
        <uni-swipe-action-item  @click="delGoods(item)" :right-options="options">
          <my-goods showRadio="true" showNum="true" :goods="item" @radio-change="changeHandler"
            @num-change="numberChange"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <my-settle></my-settle>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tatbar-badge.js'
  import {
    mapState,
    mapMutations,
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    //导入购物车中商品的数据
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
        return {
          options:[{
            text:'删除',
            style:{
              backgroundColor:'#c00000'
            }
          }]
        }
    },
    methods: {
      ...mapMutations('m_cart', ['undateGoodsState', 'updateGoodsNum','delGoodsById']),
      //改变商品选中状态的自定义事件的回调
      changeHandler(e) {
        this.undateGoodsState(e)
      },
      //改变商品数量时自定义事件的回调
      numberChange(e) {
        //修改vuex中商品的数量
        this.updateGoodsNum(e)
      },
      //滑动删除的回调函数
      delGoods(item){
        const {goods_id}=item
        this.delGoodsById(item)
      }
    },
  }
</script>

<style lang="scss">
  .cart-content{
    padding-bottom: 50px;
  }
  // 商品标题区
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .empty-cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-img{
      width: 90px;
      height: 90px;
    }
    .empty-text{
      font-size: 12px;
      color:gray;
      margin-top: 8px;
    }
  }
</style>
