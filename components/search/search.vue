<template>
  <view class="my-search-container" :style="{'background-color':bgColor}">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="getNavgiter">
      <icon type="search" size="17"></icon>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "search",
    props: {
      //背景颜色
      bgColor: {
        type: String,
        default: '#C00000'
      },
      //圆角尺寸
      radius: {
        type: Number,
        default: 18
      }
    },

    data() {
      return {};
    },
    methods: {
      getNavgiter() {
        this.$emit('myClick')
      }
    },
  }
</script>

<style lang="scss">
  .my-search-container {
    height: 50px;
    // background-color: #c00000;
    display: flex;
    align-items: center;
    padding: 0 15px;

    .my-search-box {
      height: 36px;
      width: 100%;
      background-color: #ffffff;
      // border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;

      .placeholder {
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }
</style>
