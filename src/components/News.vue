<template>
  <v-container fluid>
    <v-card>
      <v-toolbar class="teal lighten-2" dark dense>
        <v-toolbar-title class="white--text">保险快讯发布</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark icon @click="pagerouter({name:'AddNews'})">
          <v-icon>add</v-icon>
        </v-btn>
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
        class="elevation-1"
        :no-data-text="dataTableConfig.dataTable_noDataText"
        :no-results-text="dataTableConfig.dataTable_noResultsText"
        :rows-per-page-text="dataTableConfig.dataTable_rowsPerPageText"
        :pagination.sync="pagination"
        :search = "search"
        :loading="tableLoading"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.createdate }}</td>
          <td class="text-xs-center">{{ props.item.title }}</td>
          <td class="text-xs-center">{{ props.item.tbr }}</td>
          <td class="text-xs-center">
            <v-btn icon class="mx-0" @click.stop="editNews(props)">
              <v-icon color="teal lighten-2">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click.stop="deleteNewsConfrim(props)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <!--弹出删除确认框-->
    <v-dialog v-model="delete_dialog" lazy absolute persistent max-width="300px">
      <v-card>
        <v-card-text>确定删除吗？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click.native="deleteNews()" :loading="deleteLoading">删除</v-btn>
          <v-btn color="error" @click.native="delete_dialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

  import {mapGetters, mapState, mapMutations} from 'vuex'

  export default {
    components: {
    },
    mounted () {
      this.getTabelDatas();
    },
    data () {
      return {
        delete_dialog: false,
        deleteLoading: false,
        search:'',
        tableLoading:false,
        dataTableConfig: this.getCommonComponentConfig().dataTableConfig,
        pagination:{
          sortBy: 'createdate',
          descending:true
        },
        headers: [
          {
            text: '发布时间',
            align: 'center',
            sortable: true,
            value: 'createdate'
          },
          {
            text: '标题',
            align: 'center',
            sortable: false,
            value: 'title'
          },
          {
            text: '发布人',
            align: 'center',
            sortable: false,
            value: 'tbr'
          },
          { text: '操作', value: '', sortable: false,align: 'center' }
        ],
        items: [],
        deleteNewsId: ''
      }
    },
    methods: {
      ...mapMutations('news', [
        'set_update_news'
      ]),
      getTabelDatas:function () {
        let vm = this;
        vm.tableLoading = true;
        this.axios.get('queryListNews').then((response) => {
          if(response.data.data.length > 0){
            vm.items = response.data.data;
          }
          vm.tableLoading = false;
        })
      },
      editNews:function (props) {
        this.set_update_news(_.cloneDeep(props.item));
        this.pagerouter({
          name:'EditNews',
          params:{
            newsId:props.item.id
          }
        });
      },
      deleteNewsConfrim: function (props) {
        this.delete_dialog = true
        this.deleteNewsId = props.item.id
      },
      deleteNews: function () {
        let vm = this;
        vm.deleteLoading = true;
        vm.axios.post('updateNews', {
          id: vm.deleteNewsId,
          available:'0'
        }).then(function (res) {
          if (res.status === 200 && res.data.data.id) {
            vm.simpleInfo('删除成功！')
            vm.delete_dialog = false;
            vm.getTabelDatas();
          } else {
            vm.simpleError('删除失败')
          }
          vm.deleteLoading = true;
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
