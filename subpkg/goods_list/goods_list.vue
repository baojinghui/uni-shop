<template>
  <view>
    <view class="goodsList">
      <view @click="gotoDetail(goods)" v-for="(goods,index) in goodsList" :key="index">
        <!-- 商品item项组件 -->
        <my-goods :goods="goods"></my-goods>
       </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //请求参数对象
        queryObj:{
          //查询关键字
          query:'',
          //商品分类Id
          cid:'',
          //当前的页码数
          pagenum:1,
          //每页展示多少条数据
          pageSize:10
        },
        //total总共的数据条数
        total:0,
        //商品列表的数据
        goodsList:[],
        //节流阀
        flag:false
      }
    },
    onLoad(options) {
      //保存路由跳转携带过来的参数
     this.queryObj.query=options.query ||''
     this.queryObj.cid=options.cid||''
     //请求商品的列表
     this.getGoodsList()
    },
    methods: {
      //请求商品列表的数据
     async getGoodsList(cb){
       this.flag=true
      const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
      if(res.meta.status!==200) return uni.$showTip()
      //新旧数据拼接
      this.goodsList=[...this.goodsList,...res.message.goods]
      this.total=res.message.total
      this.flag=false
      //如果传递了一个下关闭拉刷新的函数，就调用
      cb &&cb()
      },
      //点击商品跳转到详情页
      gotoDetail(goods){
        uni.navigateTo({
          url:`/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
        })
      }
    },
    //上拉触底
    onReachBottom() {
      //判断节流阀状态，如果为true，就不发送请求
      if(this.queryObj.pagenum*this.queryObj.pageSize>=this.total) return uni.$showTip('数据加载完毕')
      if(this.flag) return
      //页码只+1
      this.queryObj.pagenum++
      //重新获取新旧数据拼接后的数据
      this.getGoodsList()
    },
    //下拉刷新
    onPullDownRefresh() {
      //重置关键数据
      this.queryObj.pagenum=1
      this.queryObj.total=0
      this.goodsList=[]
       this.flag=false
      //重新发送请求,并传递一个关闭下拉刷新的函数
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
