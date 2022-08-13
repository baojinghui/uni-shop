export default{
  namespaced:true,
  
  state:()=>({
    address:JSON.parse(uni.getStorageSync('userAdderss')||'{}')
  }),
  
  mutations:{
    //更新收货地址并持久化保存
    updsteAddress(state,address){
      state.address=address
      //调用mutations中的函数持久化保存
      this.commit('m_user/saveAddressToStorage')
    },
    //持久化保存
    saveAddressToStorage(state){
      uni.setStorageSync('userAddress',JSON.stringify(state.address))
    }
  },
  
  getters:{
    //返回详细的收货信息
    addressStr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
    }
  }
}