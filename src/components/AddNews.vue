<template>
  <v-container fluid>
        <v-toolbar class="teal" dark dense>
          <v-btn icon @click="pagerouter({name:'News'})" dark>
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">保险快讯发布</v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <form>
            <v-layout row wrap>
              <v-flex xs2>
                <v-subheader>标题预览图</v-subheader>
              </v-flex>
              <v-flex xs10>

                <upload-file
                  class="v1"
                  accept="image/png,image/jpeg"
                  image-class="v1-image"
                  input-class="v1-input"
                  :max-size="customImageMaxSize"
                  @size-exceeded="onSizeExceeded"
                  placeholder="点击此处上传(最佳比例长宽1:1)"
                  @file="onFile"
                  @load="onLoad"/>
              </v-flex>
              <v-flex xs2>
                <v-subheader>标题</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  v-model="title"
                  v-validate="'required'"
                  data-vv-scope="news_insert"
                  :error-messages="vee_errors.collect('标题','news_insert')[0]||[]"
                  data-vv-name="标题"
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-subheader>发布人</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  v-model="tbr"
                  v-validate="'required'"
                  data-vv-scope="news_insert"
                  :error-messages="vee_errors.collect('发布人','news_insert')[0]||[]"
                  data-vv-name="发布人"
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-subheader>内容</v-subheader>
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  v-model="content"
                  multi-line
                  v-validate="'required'"
                  data-vv-scope="news_insert"
                  :error-messages="vee_errors.collect('内容','news_insert')[0]||[]"
                  data-vv-name="内容"
                ></v-text-field>
              </v-flex>
            </v-layout>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="insertNews">提交</v-btn>
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
        title: '',
        content: '',
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
      insertNews () {
        var vm = this;
        this.$validator.validateAll("news_insert").then((result) => {
          if (result) {
            vm.axios.post('insertNews', {
              title: vm.title,
              content: vm.content,
              tbr: vm.tbr,
              previewimage: vm.previewimage
            }).then(function (res) {
              if(res.status === 200 && res.data.data.id){
                vm.simpleInfo("保存成功！");
                vm.pagerouter({name:'News'});
              }else{
                vm.simpleError("保存失败！");
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

  .v1-image {
    width: 200px;
    height: 200px;
  }
</style>
