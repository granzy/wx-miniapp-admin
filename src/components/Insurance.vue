<template>
  <v-container fluid>
    <v-card>
      <v-toolbar class="teal lighten-2" dark dense>
        <v-toolbar-title class="white--text">保险询价列表</v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="搜索"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        item-key="id"
        :no-data-text="dataTableConfig.dataTable_noDataText"
        :no-results-text="dataTableConfig.dataTable_noResultsText"
        :rows-per-page-text="dataTableConfig.dataTable_rowsPerPageText"
        class="elevation-1"
        :search = "search"
        :loading="tableLoading"
      >
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-center"><v-icon>{{ props.item.direct == 'false' ? 'keyboard_arrow_down' : '' }}</v-icon></td>
            <td class="text-xs-center">{{ props.item.createdate }}</td>
            <td class="text-xs-center">{{ props.item.idcardno }}</td>
            <td class="text-xs-center">{{ props.item.carno }}</td>
            <td class="text-xs-center">{{ props.item.phoneno }}</td>
            <td class="text-xs-center">
              <v-icon color="green" v-if="props.item.direct == 'true'" right>check_circle</v-icon>
              <v-icon color="red" v-else right>highlight_off</v-icon>
            </td>
            <td class="text-xs-center">
              {{ props.item.status }}
            </td>
            <td class="text-xs-center">
              <v-tooltip bottom>
                <v-btn slot="activator" icon class="mx-0" @click.stop="addPrice(props.item.statusCode,props.item.id)">
                  <v-icon color="teal lighten-2">add</v-icon>
                </v-btn>
                <span>新增报价</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn slot="activator" icon class="mx-0" @click.stop="quoteList(props.item.id)">
                  <v-icon color="teal lighten-2">info</v-icon>
                </v-btn>
                <span>报价历史</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props"  v-if="props.item.direct == 'false'">
          <v-card flat>
            <v-container grid-list-md text-xs-center style="background-color:#eee">
              <v-layout row wrap>
                <v-flex xs3 v-if="props.item.jdcssx == 'true'">
                  <v-card>
                    <v-card-text class="px-0">机动车损失险</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.dszzrxCode != '0'">
                  <v-card>
                    <v-card-text class="px-0 content-important">第三者责任险(<span>{{props.item.dszzrx}}</span>)</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.csryzrxsjCode != '0'">
                  <v-card>
                    <v-card-text class="px-0 content-important">车上人员责任险(司机)(<span>{{props.item.csryzrxsj}}</span>)</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.csryzrxckCode != '0'">
                  <v-card>
                    <v-card-text class="px-0 content-important">车上人员责任险(乘客)(<span>{{props.item.csryzrxck}}</span>)</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.blddpsxCode != '0'">
                  <v-card>
                    <v-card-text class="px-0 content-important">玻璃单独破碎险(<span>{{props.item.blddpsx}}</span>)</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.jdcdqx=='true'">
                  <v-card>
                    <v-card-text class="px-0 content-important">机动车盗抢险</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.zrsxx=='true'">
                  <v-card>
                    <v-card-text class="px-0 content-important">自然损失险</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.cshhsxxCode != '0'">
                  <v-card>
                    <v-card-text class="px-0 content-important">车身划痕险(<span>{{props.item.cshhsxx}}</span>)</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.fdjtbssx=='true'">
                  <v-card>
                    <v-card-text class="px-0 content-important">发动机特别损失险（涉水险）</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.bjmpx=='true'">
                  <v-card>
                    <v-card-text class="px-0 content-important">不计免赔险</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs3 v-if="props.item.wfzddsftyx=='true'">
                  <v-card>
                    <v-card-text class="px-0 content-important">无法找到第三方特约险</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </template>
      </v-data-table>
      <v-dialog v-model="quoteDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">保险报价</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field label="报价总额（元）"
                                v-model="price"
                                v-validate="'required'"
                                data-vv-scope="quote_insert"
                                :error-messages="vee_errors.collect('报价总额（元）','quote_insert')[0]||[]"
                                data-vv-name="报价总额（元）"
                                type="number"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field label="报价人"
                                v-model="tbr"
                                v-validate="'required'"
                                data-vv-scope="quote_insert"
                                :error-messages="vee_errors.collect('报价人','quote_insert')[0]||[]"
                                data-vv-name="报价人"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="quoteDialog = false">关闭</v-btn>
            <v-btn color="blue darken-1" flat @click.native="saveQuote">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="quoteListDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">保险报价列表</span>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="quoteHeaders"
              :items="quoteItems"
              class="elevation-1"
              :no-data-text="dataTableConfig.dataTable_noDataText"
              :no-results-text="dataTableConfig.dataTable_noResultsText"
              :rows-per-page-text="dataTableConfig.dataTable_rowsPerPageText"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.createdate }}</td>
                <td class="text-xs-center">{{ props.item.price }}</td>
                <td class="text-xs-center">{{ props.item.tbr }}</td>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="quoteListDialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    mounted () {
      this.getTabelDatas();
    },
    data () {
      return {
        tableLoading:false,
        dataTableConfig: this.getCommonComponentConfig().dataTableConfig,
        pagination: {
          sortBy: 'createdate',
          descending:true
        },
        search:'',
        headers: [
          { text: '', value: ''},
          { text: '询价时间', value: 'createdate', sortable: true,align: 'center' },
          {
            text: '身份证号码',
            align: 'center',
            sortable: false,
            value: 'idcardno'
          },
          {text: '车牌号码', value: 'carno', sortable: true,align: 'center'},
          { text: '手机号', value: 'phoneno', sortable: true,align: 'center' },
          { text: '直接续保', value: 'protein', sortable: false,align: 'center' },
          { text: '状态', value: 'status', sortable: false,align: 'center' },
          { text: '操作', value: '', sortable: false,align: 'center' }
        ],
        items: [],
        quoteDialog:false,
        price:'',
        tbr:'',
        currentInsuranceid:'',
        quoteHeaders:[
          { text: '报价时间', value: 'createdate', sortable: true,align: 'center' },
          { text: '报价金额(元)', value: 'price', sortable: true,align: 'center' },
          { text: '报价人', value: 'tbr', sortable: true,align: 'center' }
        ],
        quoteItems:[],
        quoteListDialog:false
      }
    },
    methods: {
      getTabelDatas:function () {
        let vm = this;
        vm.tableLoading = true;
        this.axios.get('queryInsuranceByOpenid').then((response) => {
          if(response.data.data.length > 0){
            if(vm.$route.params.param){
              vm.items = response.data.data.filter(function (item) {
                return item.statusCode == '0';
              });
            }else{
              vm.items = response.data.data;
            }
          }
          vm.tableLoading = false;
        })
      },
      addPrice :function(statusCode,insuranceid){
        this.quoteDialog = true;
        this.currentInsuranceid = insuranceid;
      },
      quoteList:function (insuranceid) {
        let vm = this;
        this.quoteListDialog = true;
        this.currentInsuranceid = insuranceid;
        this.axios.get('queryQuoteByInsuranceid?insuranceid='+insuranceid)
          .then(function (response) {
            if(response.data.data.length > 0){
              vm.quoteItems = response.data.data;
            }
          });
      },
      saveQuote:function(){
        let vm = this;
        this.$validator.validateAll("quote_insert").then((result) => {
          if (result) {
            this.axios.all([vm.axios.post("insertQuote",{
              insuranceid :vm.currentInsuranceid,
              price:vm.price,
              tbr:vm.tbr
            }),vm.axios.post("updateInsuranceInfo",{
              id :vm.currentInsuranceid,
              status:'1'
            })]).then(vm.axios.spread(function (insertQuoteResp,updateInsuranceInfoResp) {
              if(insertQuoteResp.status === 200 && insertQuoteResp.data.data.id
              &&updateInsuranceInfoResp.status === 200 && updateInsuranceInfoResp.data.data.id){
                vm.getTabelDatas();
                vm.quoteDialog = false;
                vm.simpleSuccess("报价成功！");
              }

            }));

          }
        });
      }
    },
    watch:{
      'quoteDialog':function (val) {
        if(val){
          this.price = '';
          this.tbr = '';
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .content-important span{
    color: red;
  }
</style>
