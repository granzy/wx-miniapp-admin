<template>
  <v-container fluid>
        <v-toolbar class="teal lighten-2" dark dense>
          <v-btn icon @click="pagerouter({name:'Carousel'})" dark>
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">首页轮播图片修改</v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs2>
                <v-subheader>图片上传</v-subheader>
              </v-flex>
              <v-flex xs10>
                <img :src="update_carousel.url" v-show="showUrlImage" style="width: 700px;height: 300px;"/>
                <upload-file
                  class="v1"
                  accept="image/png,image/jpeg"
                  image-class="v1-carosel-image"
                  input-class="v1-input"
                  :max-size="customImageMaxSize"
                  @size-exceeded="onSizeExceeded"
                  placeholder="点击此处上传(最佳分辨率750*300)"
                  @file="onFile"
                  @load="onLoad"/>
              </v-flex>
              <v-flex xs2>
                <v-subheader>显示顺序</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  v-model="update_carousel.order"
                  v-validate="'required'"
                  data-vv-scope="carousel_update"
                  :error-messages="vee_errors.collect('显示顺序','carousel_update')[0]||[]"
                  data-vv-name="显示顺序"
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-subheader>发布人</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  v-model="update_carousel.tbr"
                  v-validate="'required'"
                  data-vv-scope="carousel_update"
                  :error-messages="vee_errors.collect('发布人','carousel_update')[0]||[]"
                  data-vv-name="发布人"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="insertCarousel">提交</v-btn>
          </v-card-actions>
        </v-card>
  </v-container>
</template>
<script>
  import UploadFile from '@/components/UploadFile';
  import {mapGetters, mapState, mapMutations} from 'vuex';
  import store from '@/store';

  export default {
    components: {
      UploadFile
    },
    beforeRouteEnter (to, from, next) {
      if(!store.state.carousel.update_carousel) {
        next('/carousel')
      }else{
        next();
      }
    },
    mounted () {
    },
    data () {
      return {
        customImageMaxSize: 1,// megabytes
        showUrlImage:true
      }
    },
    methods: {
      onFile (file) {
        //console.log(file) // file object
      },

      onLoad (dataUri) {
        //console.log(dataUri) // data-uri string
        this.update_carousel.url = dataUri;
        this.showUrlImage = false;
      },

      onSizeExceeded (size) {
        this.simpleError(`上传图片大小 ${size}Mb 超出限制大小 ${this.customImageMaxSize}Mb!`)
      },
      insertCarousel () {
        var vm = this;
        this.$validator.validateAll("carousel_update").then((result) => {
          if (result) {
            vm.axios.post('updateCarousel', {
              id:vm.update_carousel.id,
              order: vm.update_carousel.order,
              tbr: vm.update_carousel.tbr,
              url: vm.update_carousel.url
            }).then(function (res) {
              if(res.status === 200 && res.data.data.id){
                vm.simpleInfo("更新成功！");
                vm.pagerouter({name:'Carousel'});
              }else{
                vm.simpleError("更新失败");
              }

            });
          }
        });
      }
    },
    computed:{
      ...mapState('carousel', ['update_carousel'])
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .v1-carosel-image {
    width: 700px;
    height: 300px;
  }
</style>
