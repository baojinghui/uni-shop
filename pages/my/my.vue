<template>
  <view class="my-container"> 
  <my-userInfo  v-if="token"></my-userInfo>
  <my-login v-else></my-login>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tatbar-badge.js'
  import {mapState} from 'vuex'
  export default {
    //混入购物车的数字徽标
    mixins:[badgeMix],
    computed:{
      ...mapState('m_user',['token'])
    },
    data() {
      return {
        
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="scss">
page,.my-container{
  height: 100%;
}
</style>
