
const state={
  update_carousel:null
}

const mutations={
  clear_update_carousel(){
    state.update_carousel = null;
  },
  set_update_carousel(state, carousel){
    state.update_carousel = carousel;
  }
}

export default{
  namespaced: true,
  state,
  mutations
}
