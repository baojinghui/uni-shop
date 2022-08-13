<template>
  <view>
    <!-- 使用自定义的search组件 -->
    <search bgColor="#0984d9" @myClick="goNav"></search>
    <view class="scroll-view-container">
      <!-- 左侧滑动区 -->
      <scroll-view class="left-scroll" scroll-y="true" :style="{height:wh+'px'}">
        <block v-for="(item,index) in cateList" :key="item.cat_id">
          <view :class="['left-item',{'active':index===active?'active':''}]" @click="activeChange(index)">
            {{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区 -->
      <scroll-view class="rigth-scroll" scroll-y="true" :scroll-top="scrollTop" :style="{height:wh+'px'}">
        <view class="cateLevel2" v-for="(item2,index2) in cateLevel2" :key="index2">
          <!-- 二级分类和标题 -->
          <view class="cate-level2-title">
            / {{item2.cat_name}} /
          </view>
          <!-- 当前二级分类下的三级分类列表-->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)"> 
              <!-- 三级分类的图片 -->
              <image :src="item3.cat_icon.replace('dev','web')"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tatbar-badge.js'
  export default {
    mixins:[badgeMix],
    data() {
      return {
        //当前设备可用高度
        wh: 0,
        //分类数据
        cateList: [],
        //激活active样式
        active: 0,
        //二级分类的数据
        cateLevel2: [],
        //每次切换一级分类置顶三级分类
        scrollTop:0.001 
      };
    },
    onLoad() {
      //获取设备winndow宽度
      let {
        windowHeight
      } = uni.getSystemInfoSync()
      this.wh = windowHeight-50
      //获取商品分类的数据
      this.getCateList()
    },
    methods: {
      //获取全部分类的列表
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) {
          return uni.$showTip()
        }
        this.cateList = res.message
        //为二级分类赋值
        this.cateLevel2 = res.message[0].children
      },
      //切换一级分类的回调
      activeChange(index) {
        this.active = index
        //每次改变index都为cateLevel2重新赋值
        this.cateLevel2 = this.cateList[index].children
        //把scrollTop重置为0，每次切换一级分类，都会重置三级分类scroll的置顶
        this.scrollTop=0
      },
      //跳转到商品列表也页面
      gotoGoodsList(item3){
        uni.navigateTo({
          url:`/subpkg/goods_list/goods_list?cid=${item3.cat_id}`
        })
      },
      //跳转到搜索页面
      goNav(){
        uni.navigateTo({
          url:"/subpkg/search/search"
        })
      },
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;
    .left-scroll {
      width: 120px;
      .left-item {
        background-color: #a8a8a8;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: white;
          position: relative;

          &:before {
            content: '';
            display: block;
            width: 3px;
            height: 30px;
            background-color: red;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    //二级分类
    .cate-level2-title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px;
    }
  }
  //三级分类的样式
  .cate-lv3-list{
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item{
      width: 33%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      image{
        width: 60px;
        height: 60px;
      }
      text{
        font-size: 12px;
      }
    }
  }
</style>
