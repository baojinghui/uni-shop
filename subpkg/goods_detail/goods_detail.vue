<template>
  <view v-if="goodsInfo.goods_name" class="goods-detail">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in goodsInfo.pics" :key="index">
        <image @click="preview(index)" :src="item.pics_big" class="swiper-item"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">
        ￥{{goodsInfo.goods_price}}
      </view>
      <!-- 商品主题信息区域 -->
      <view class="goods-main">
        <!-- 商品名称 -->
        <view class="goods-name">
          {{goodsInfo.goods_name}}
        </view>
        <!-- 收藏 -->
        <view class="favorite">
          <uni-icons type="star" size="17" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">
        快递：免运费
      </view>
    </view>
    <!-- 富文本 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>

    <!-- 商品导航组件 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      ...mapState('m-cart', []),
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total: {
        deep:true,
        immediate: true, //初始化时handeler调用一次
        handler(newVal) {
          //find找会返回数组做那个的元素，找不到返回undefined
          const findResult = this.options.find(x => x.text === "购物车")
          if (findResult) {
            findResult.info = newVal
          }
        }
      }
    },
    data() {
      return {
        //商品导航
        options: [{
          icon: 'headphones',
          text: '客服'
        }, {
          icon: 'shop',
          text: '店铺',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
            color: '#fff'
          }
        ],
        //商品详情信息
        goodsInfo: {},
      };
    },
    onLoad(options) {
      const {
        goods_id
      } = options
      //根据商品id请求商品详情
      this.getGoodsDetail(goods_id)
    },
    methods: {
      //映射解构添加商品进购物车的函数
      ...mapMutations('m_cart', ['addToCar']),
      //根据商品id请求商品详情的方法
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showTip()
        //正则替换，消除图片的空白间隙
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
          .replace(/webp/g, 'jpg')
        this.goodsInfo = res.message
      },
      //查看图片的回调,轮播图的大图预览
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goodsInfo.pics.map((item) => item.pics_big)
        })
      },
      //商品导航组件
      onClick(e) { //左侧点击事件的处理函数
        //点击按钮跳转到购物车页面
        if (e.content.text === "购物车") {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) { //右侧点击事件的处理函数
        if (e.content.text === "加入购物车") {
          //组织商品信息对象
          const goods = {
            goods_id: this.goodsInfo.goods_id,
            goods_name: this.goodsInfo.goods_name,
            goods_price: this.goodsInfo.goods_price,
            goods_count: 1,
            goods_small_logo: this.goodsInfo.goods_small_logo,
            goods_state: true
          }
          // 调用addToCart方法将商品推入仓库
          this.addToCar(goods)
        }
      },
      //
    },
  }
</script>

<style lang="scss">
  // 轮播图
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  //商品信息
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-main {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        margin-right: 10px;
      }

      .favorite {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #f3f3f3;
        color: gray
      }


    }

    .yf {
      font-size: 12px;
      color: gray;
      margin: 10px 0;
    }
  }

  .goods-nav {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .goods-detail {
    padding-bottom: 50px;
  }
</style>
