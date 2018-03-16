
const state={
  update_news:null
}

const mutations={
  clear_update_news(){
    state.update_news = null;
  },
  set_update_news(state, news){
    state.update_news = news;
  }
}

export default{
  namespaced: true,
  state,
  mutations
}
