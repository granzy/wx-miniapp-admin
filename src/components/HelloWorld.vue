<template>
  <v-container grid-list-md id="dashboard">
    <v-layout row class="mx-2">
      <v-flex md6 sm6 xs12>
        <v-card class="yellow darken-2" light>
          <v-container fluid grid-list-sm>
            <v-layout row class="mt-2 mb-0" >
              <v-flex xs4>
                <v-icon class="mx-4" x-large dark>bubble_chart</v-icon>
              </v-flex>
              <v-flex xs8>
                <div class="white--text darken-1">
                  <div class="subheading">需报价</div>
                  <strong>{{waitForQuoteNum}}</strong>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row class="my-0">
              <v-flex xs12 class="text-xs-right">
                <v-btn flat class="white--text darken-1" @click.stop="routerViewPage({param:'noQuote'},'Insurance')">去报价</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex md6 sm6 xs12>
        <v-card class="light-green  darken-2" light>
          <v-container fluid grid-list-sm>
            <v-layout row class="mt-2 mb-0" >
              <v-flex xs4>
                <v-icon class="mx-4" x-large dark>collections</v-icon>
              </v-flex>
              <v-flex xs8>
                <div class="white--text darken-1">
                  <div class="subheading">首页轮播图片</div>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row class="my-0">
              <v-flex xs12 class="text-xs-right">
                <v-btn flat class="white--text darken-1" @click.stop="routerViewPage('','Carousel')">查看</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex md6 sm6 xs12>
        <v-card class="light-blue" light>
          <v-container fluid grid-list-sm>
            <v-layout row class="mt-2 mb-0" >
              <v-flex xs4>
                <v-icon class="mx-4" x-large dark>fiber_new</v-icon>
              </v-flex>
              <v-flex xs8>
                <div class="white--text darken-1">
                  <div class="subheading">保险快讯</div>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row class="my-0">
              <v-flex xs12 class="text-xs-right">
                <v-btn flat class="white--text darken-1" @click.stop="routerViewPage('','News')">查看</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex md6 sm6 xs12>
        <v-card class="teal lighten-2" light>
          <v-container fluid grid-list-sm>
            <v-layout row class="mt-2 mb-0" >
              <v-flex xs4>
                <v-icon class="mx-4" x-large dark>record_voice_over</v-icon>
              </v-flex>
              <v-flex xs8>
                <div class="white--text darken-1">
                  <div class="subheading">客服电话</div>
                  <strong>{{phonenumber}}</strong>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row class="my-0">
              <v-flex xs12 class="text-xs-right">
                <v-btn flat class="white--text darken-1" @click.stop="updateServiceNumberDialog = true">修改</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="updateServiceNumberDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">服务号码修改</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="服务号码"
                              v-model="phonenumber"
                              v-validate="'required'"
                              data-vv-scope="servicenumber_update"
                              :error-messages="vee_errors.collect('服务号码','servicenumber_update')[0]||[]"
                              data-vv-name="服务号码"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="updateServiceNumberDialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" flat @click.native="updatePhoneNumber">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>
<script>

  export default {
    mounted(){
      this.getWaitForQuoteNum();

      let vm = this;
      vm.axios.get('queryServiceNumber').then(function (res) {
        vm.phonenumber = res.data.data[0].phonenumber || '';
      })

    },
    data () {
      return {
        waitForQuoteNum:0,
        updateServiceNumberDialog:false,
        phonenumber:''
      }
    },
    methods:{
      routerViewPage:function (params,routerName) {
        this.$router.push({
          name : routerName,
          params:params
        });
      },
      getWaitForQuoteNum:function () {
        let vm = this;
        this.axios.get('queryWaitForQuote').then((response) => {
          if(response.data.data.length > 0){
            vm.waitForQuoteNum = (response.data.data)[0].num;
          }
        })
      },
      updatePhoneNumber:function(){
        let vm = this;
        vm.axios.post('updateServicePhoneNumber', {
          phonenumber : vm.phonenumber
        }).then(function (res) {
          if(res.status === 200 && res.data.data.res){
            vm.simpleInfo("更新成功！");
            vm.updateServiceNumberDialog = false;
          }else{
            vm.simpleError("更新失败");
          }
        })
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #dashboard .flex {
    height: 90px;
  }

  #dashboard{
    margin-top:100px;
  }
</style>
