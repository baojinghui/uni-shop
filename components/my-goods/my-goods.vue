<template>
        <view class="goods-item">
        <!-- 左侧盒子 -->
        <view class="goods-left">
          <image :src="goods.goods_small_logo ||defaultPic" class="goods-pic"></image>
        </view>
        <!-- 右侧盒子 -->
        <view class="goods-right">
          <view class="goods-name">
            {{goods.goods_name}}
          </view>
          <view class="goods-info-box">
            <view class="goods-price">
              ￥{{goods.goods_price }}
            </view>
          </view>
          </view>
        </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default: {}
      }
    },
    data() {
      return {
        //默认图片地址
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters:{
      tofixed(num){
        console.log(num);
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    .goods-left{
      margin-right: 5px;
      .goods-pic{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .goods-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        .goods-price{
          color: #c00000;
          font-size: 16px;
        }
      }
    }
  }
</style>