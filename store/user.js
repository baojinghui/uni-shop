export default {
  namespaced: true,

  state: () => ({
    address: JSON.parse(uni.getStorageSync('userAdderss') || '{}'),
    token:uni.getStorageSync('token')||'',
    userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    //重定向的对象
    redirectInfo:null,
  }),

  mutations: {
    //更新收货地址并持久化保存
    updsteAddress(state, address) {
      state.address = address
      //调用mutations中的函数持久化保存
      this.commit('m_user/saveAddressToStorage')
    },
    //地址信息持久化保存到本地
    saveAddressToStorage(state) {
      uni.setStorageSync('userAddress', JSON.stringify(state.address))
    },
    //接受用户信息,上传state使数据持久化
    updateUserInfo(state, userinfo) {
      state.userInfo = userinfo
      //用户信息持久化保存到本地
      this.commit('m_user/saveUserInfo')
    },
    //用户信息持久化保存到本地
    saveUserInfo(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userInfo))
    },
    //将token持久化保存到本地
    saveToken(state){
      uni.setStorageSync('token',JSON.stringify(state.token))
    },
    //更新token
    updataToken(state,str){
      state.token=str
      this.commit('m_user/saveToken')
    },
    //将来重定向的路由信息
    updateRedirectInfo(state,info){
      console.log(info)
      state.redirectInfo=info
    }
  },

  getters: {
    //返回详细的收货信息
    addressStr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
