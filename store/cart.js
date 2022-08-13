export default{
  namespaced:true,
  state:()=>({
    //goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state
      cart: JSON.parse(uni.getStorageSync('cart')||'[]') 
  }),
  mutations:{
    //将商品添加到购物车，如果商品不存在就添加，存在就添加商品数量
    addToCar(state,goods){
      //当数组中的元素在测试条件时返回 true 时, find() 返回数组中符合条件的元素，之后的值不会再调用执行函数
      //查看仓库中是否存在此商品
      const findResult=state.cart.find(item=> item.goods_id===goods.goods_id)
      if(!findResult){
        state.cart.push(goods)
      }else{
          //上品存在让数量加一
        findResult.goods_count++    
      }
    //让数据本地储存持久化
      this.commit('m_cart/saveToStorage')
    },
    //让仓库中的数据持久化，保存在本地
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    //更新购物车中国商品的勾选状态
    undateGoodsState(state,goods){
    const findResult= state.cart.find(item=>{
        return item.goods_id===goods.goods_id
      })
      if(findResult) findResult.goods_state=goods.goods_state
      //使数据持久化
     this.commit('m_cart/saveToStorage')
    },
    //更新商品的数量
    updateGoodsNum(state,goods){
      const findResult=state.cart.find(x=>(x.goods_id===goods.goods_id))
      if(findResult)findResult.goods_count=goods.goods_count
      //使数据持久化
      this.commit('m_cart/saveToStorage')
    },
    //滑动删除的回调
   delGoodsById(state,goods){
        state.cart=state.cart.filter(item=>{
        return item.goods_id!==goods.goods_id
      })
      //使数据持久化
      this.commit('m_cart/saveToStorage')
    },
    //购物车全选按钮点击取反
    checkedOrFanxuan(state,ck){
      state.cart.forEach(item=>{
        item.goods_state=ck
      })
      //使数据持久化
      this.commit('m_cart/saveToStorage')
    },    
  },
  getters:{
    //计算购物车中商品的总数
    total(state){
      return state.cart.reduce((total,item)=>total+=item.goods_count ,0)
    },
    //选中购物车商品个数的累加和
    checkCount(state){
     return state.cart.filter(item=>item.goods_state).reduce((total,item)=>total+=item.goods_count,0)
    },
    //购物车全选按钮是否勾选
    allChecked(state){
     return state.cart.every(item=>{
        return item.goods_state===true
      })
    },
    //购物车中选中商品的总价格
    allPrice(state){
      let allMoney=0
      state.cart.forEach(item=>{
        if(item.goods_state)
        allMoney+=item.goods_price*item.goods_count
      })
     return allMoney
    },
  }
}