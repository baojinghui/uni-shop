<template>
  <view>
    <!-- 搜索组件 -->
    <view class="search-box">
      <search bgColor="#0984d9" @myClick="goNav"></search>
    </view>
    <!-- 轮播图部分 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <!-- 轮播图的每一项 -->
      <swiper-item v-for="(item,index) of swiperList" :key="item.goods_id">
        <!-- 点击轮播图 里面的图片进行路由跳转 -->
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 导航栏部分 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>

    <!-- 楼层部分 -->
    <view class="floor-list">
      <!-- 楼层item项 -->
      <view class="floor-item" v-for="(item,index) in floorList" :key="index">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片大盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <!-- 右侧的大盒子 -->
          <view class="right-img-box">
            <!-- 右侧的每张 -->
            <navigator class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2"
              v-show="index2!==0" :url="item.product_list[index2].url">
              <image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [], //轮播图
        navList: [], //导航栏数据
        floorList: [], //楼层图片的数据
      }
    },
    onLoad() {
      //调用获取轮播图方法
      this.getSwiperList()
      //获取导航栏数据的方法
      this.getNavList()
      //获取楼层数据
      this.getFloorList()
    },
    methods: {
      //调用获取轮播图方法
      async getSwiperList() {
        const {
          data: result
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (result.meta.status !== 200) {
          return uni.$showTip()
        }
        this.swiperList = result.message
      },
      //获取导航栏数据的方法   
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) {
          return uni.$showTip()
        }
        this.navList = res.message
      },
      //nav点击事件处理函数
      navClickHandler(item) {
        if (item.name === "分类") {
          uni.switchTab({ //跳转到tabbar页面
            url: "/pages/cate/cate"
          })
        }
      },
      //获取首页楼层数据
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) {
          return uni.$showTip()
        }
        //处理数据
        res.message.forEach((floor) => {
          floor.product_list.forEach((item2) => {
            item2.url = `/subpkg/goods_list/goods_list?${item2.navigator_url.split('?')[1]}`
          })
        })
        this.floorList = res.message
      },
      //跳转到搜索页面
      goNav() {
        uni.navigateTo({
          url: "/subpkg/search/search"
        })
      },
    }
  }
</script>

<style lang="scss">
  swiper {
    margin: 10rpx;
    height: 330rpx;
    box-shadow: 0px 8px 8px #888888;

    .swiper-item,
    image {
      height: 100%;
      width: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin-top: 20rpx;

    .nav-item {
      image {
        width: 128rpx;
        height: 140rpx;
      }
    }
  }

  .floor-list {
    margin-top: 20rpx;

    .floor-title {
      width: 100%;
      height: 60rpx;
    }
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  // 粘性定位把搜索框固定到首页上个面
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
