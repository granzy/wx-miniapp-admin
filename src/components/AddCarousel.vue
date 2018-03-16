<template>
  <v-container fluid>
        <v-toolbar class="teal" dark dense>
          <v-btn icon @click="pagerouter({name:'Carousel'})" dark>
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">首页轮播图片</v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <form>
            <v-layout row wrap>
              <v-flex xs2>
                <v-subheader>图片上传</v-subheader>
              </v-flex>
              <v-flex xs10>

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
                  v-model="order"
                  v-validate="'required'"
                  data-vv-scope="carousel_insert"
                  :error-messages="vee_errors.collect('显示顺序','carousel_insert')[0]||[]"
                  data-vv-name="显示顺序"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-subheader>发布人</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  v-model="tbr"
                  v-validate="'required'"
                  data-vv-scope="carousel_insert"
                  :error-messages="vee_errors.collect('发布人','carousel_insert')[0]||[]"
                  data-vv-name="发布人"
                ></v-text-field>
              </v-flex>
            </v-layout>
            </form>
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

  export default {
    components: {
      UploadFile
    },
    data () {
      return {
        customImageMaxSize:1,
        order: '',
        tbr: '',
        previewimage:''
      }
    },
    methods: {
      onFile (file) {
      },

      onLoad (dataUri) {
        this.previewimage = dataUri
      },

      onSizeExceeded (size) {
        this.simpleError(`上传图片大小 ${size}Mb 超出限制大小 ${this.customImageMaxSize}Mb!`)
      },
      insertCarousel () {
        var vm = this;
        this.$validator.validateAll("carousel_insert").then((result) => {
          if (result) {
            vm.axios.post('insertCarousel', {
              order: vm.order,
              tbr: vm.tbr,
              url: vm.previewimage
            }).then(function (res) {
              if(res.status === 200 && res.data.data.id){
                vm.simpleInfo("保存成功！");
                vm.pagerouter({name:'Carousel'});
              }else{
                vm.simpleError("保存失败！")
              }
            });
          }
        });
      }
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
