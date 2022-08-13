import { mapGetters } from 'vuex'
   export default {
    computed: {
      ...mapGetters('m_cart', ['total'])
    },
    watch:{
      total:{
        deep:true,
        immediate:true,
        handler(newVal){
          this.setBadge()
        }
      }
    },
    onShow() {
      //配置购物车页面的徽章
      this.setBadge()
    },
    methods: {
      setBadge() {
        //设置tabbar徽章
        uni.setTabBarBadge({
          index: 2, //购物车页面所在tabbar的下标
          text: this.total + '', //值必须为字符串
        })
      }
    }
  }
