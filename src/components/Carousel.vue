<template>
  <v-container fluid>
    <v-card>
      <v-toolbar class="teal lighten-2" dark dense>
        <v-toolbar-title class="white--text">首页轮播图片</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark icon @click="pagerouter({name:'AddCarousel'})">
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
        :loading="tableLoading"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.createdate }}</td>
          <td class="text-xs-center">
            <img :src="props.item.url" style="width: 70px;height: 30px;"/>
          </td>
          <td class="text-xs-center">{{ props.item.order }}</td>
          <td class="text-xs-center">{{ props.item.tbr }}</td>
          <td class="text-xs-center">
            <v-btn icon class="mx-0" @click.stop="editCarousel(props)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click.stop="deleteCarouselConfrim(props)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>

      <!--弹出删除确认框-->
      <v-dialog v-model="delete_dialog" lazy absolute persistent max-width="300px">
        <v-card>
          <v-card-text>确定删除吗？</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click.native="deleteCarousel()" :loading="deleteLoading">删除</v-btn>
            <v-btn color="error" @click.native="delete_dialog = false">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>

  import { mapGetters, mapState, mapMutations } from 'vuex'

  export default {
    components: {},
    mounted () {
      this.getTabelDatas()
    },
    data () {
      return {
        tableLoading:false,
        delete_dialog: false,
        deleteLoading: false,
        dataTableConfig: this.getCommonComponentConfig().dataTableConfig,
        pagination: {
          sortBy: 'createdate',
          descending: true
        },
        search:'',
        headers: [
          {
            text: '发布时间',
            align: 'center',
            sortable: true,
            value: 'createdate'
          },
          {
            text: '预览',
            align: 'center',
            sortable: false,
            value: 'url'
          },
          {
            text: '排序',
            align: 'center',
            sortable: false,
            value: 'order'
          },
          {
            text: '发布人',
            align: 'center',
            sortable: false,
            value: 'tbr'
          },
          {text: '操作', value: '', sortable: false, align: 'center'}
        ],
        items: [],
        deleteCarouselId: ''
      }
    },
    methods: {
      ...mapMutations('carousel', [
        'set_update_carousel'
      ]),
      getTabelDatas: function () {
        let vm = this
        vm.tableLoading = true;
        this.axios.get('queryListCarousel').then((response) => {
          if (response.data.data.length > 0) {
            vm.items = response.data.data;
          }
          vm.tableLoading = false;
        })
      },
      editCarousel: function (props) {
        this.set_update_carousel(_.cloneDeep(props.item))
        this.pagerouter({
          name: 'EditCarousel',
          params: {
            carouselId: props.item.id
          }
        })
      },
      deleteCarouselConfrim: function (props) {
        this.delete_dialog = true
        this.deleteCarouselId = props.item.id
      },
      deleteCarousel: function () {
        let vm = this;
        vm.deleteLoading = true;
        vm.axios.post('updateCarousel', {
          id: vm.deleteCarouselId,
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
