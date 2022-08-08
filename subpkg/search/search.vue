<template>
  <view>
    <!-- 置顶的搜索框 -->
    <view class="search-box">
      <uni-search-bar :radius="100" @input="input" focus cancelButton="none">
      </uni-search-bar>
    </view>

    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchList.length!==0">
      <view class="sugg-item" v-for="(item,index) in searchList" :key="item.goods_id" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="forward" size="17"  ></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表，面包屑区 -->
      <view class="history-list">
        <uni-tag @click="gotoGoodsList(item)" :text="item" v-for="(item,index) in history" :key="index"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null, //定时器的名字
        keyWord: '', //用户输入的搜索关键词
        searchList: [], //搜索的结果列表
        historyList: [], //搜索历史
      };
    },
    computed:{
      //得到反转后的historyList
      history(){
        if(this.historyList.length===0) return []
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
    if(uni.getStorageSync('keyWord'))
     this.historyList =JSON.parse(uni.getStorageSync('keyWord'))
    },
    methods: {
      //用户输入事件
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keyWord = e
          //获取搜索列表
          this.getSearchList()
        }, 500)
      },
      //根据关键词获取搜索建议列表
      async getSearchList() {
        //如果没有关键词清空searchList咧白哦
        if (this.keyWord === '') {
          this.searchList = []
          return
        }
        //有关键词发请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.keyWord
        })
        if (res.meta.status != 200) return uni.$shopTop()
        this.searchList = res.message
      },
      //携带商品id跳转详情页
      gotoDetail(item) {
        //保存搜索历史的关键字
         this.saveHistory()
         uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
        })
      },
      // 添加去过重的搜索历史
      saveHistory(){
        const set=new Set(this.historyList)
        //数组中去掉重复的关键字，如果下次再次输入重复的九八上次的删除了
        set.delete(this.keyWord)
        //然后重新添加新的关键字
        set.add(this.keyWord)
        this.historyList=Array.from(set) 
         //对搜索历史进行持久化存储
        uni.setStorageSync('keyWord',JSON.stringify(this.historyList))
      },
      //点击icon清空历史记录
      cleanHistory(){
      this.historyList=[]
      uni.clearStorageSync('keyword')
     },
     gotoGoodsList(item){
       uni.navigateTo({
         url:`/subpkg/goods_list/goods_list?query=${item}`
       })
     }
    },
  }
</script>

<style lang="scss">
  //置顶的搜索框部分
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  //搜索建议部分
  .sugg-list {
    padding: 0 10px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        white-space: nowrap; //文本不允许换行，单行文本
        overflow: hidden; //多余文本隐藏
        //溢出文本使用...代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  //搜索历史部分
  .history-box {  
    padding: 0px 10px ;
    .history-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
    .history-list{
      display: flex;
      flex-wrap: wrap;
      .uni-tag{
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
