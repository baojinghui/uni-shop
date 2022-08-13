<template>
        <view class="goods-item">
        <!-- 左侧盒子 -->
        <view class="goods-left">
          <radio  v-if="showRadio" :checked="goods.goods_state" @click="changeGoods" color="#C00000"></radio>
          <image :src="goods.goods_small_logo ||defaultPic" class="goods-pic"></image>
        </view>
        <!-- 右侧盒子 -->
        <view class="goods-right">
          <view class="goods-name">
            {{goods.goods_name}}
          </view>
          <view class="goods-info-box">
            <!-- 商品价格 -->
            <view class="goods-price">
              ￥{{goods.goods_price }}
            </view>
            <!-- 商品数量 -->
            <uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="numChangeHanduler" ></uni-number-box>
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
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        //默认图片地址
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods:{
      //改变商品选中状态
      changeGoods(){
      this.$emit('radio-change',{
        goods_id:this.goods.goods_id,
        goods_state:!this.goods.goods_state
      })
      },
      //改监听商品数量加减的事件
      numChangeHanduler(value){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:value-0
        })
      }
    },
    filters:{
      tofixed(num){
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
      display: flex;
      align-items: center;
      .goods-pic{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .goods-right{
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-price{
          color: #c00000;
          font-size: 16px;
        }
      }
    }
  }
</style>