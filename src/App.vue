<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click.stop="routerLink(item)"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      dark
      class="teal lighten-2"
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>

    <!--公共弹框组件-->
    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbarVisibleC"
      style="z-index:999;"
    >
      {{ text }}
    </v-snackbar>

  </v-app>
</template>

<script>

  import {mapGetters, mapMutations, mapState} from 'vuex';


export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [{
        icon: 'dashboard',
        title: 'DashBoard',
        link: 'dashboard'
      },{
        icon: 'collections',
        title: '首页轮播图片',
        link: 'Carousel'
      },{
        icon: 'bubble_chart',
        title: '保险询价列表',
        link: 'Insurance'
      },{
        icon: 'fiber_new',
        title: '保险快讯发布',
        link: 'News'
      },{
        icon: 'record_voice_over',
        title: '客户在线服务',
        link: 'CustomerService'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '后台管理系统'
    }
  },
  methods: {
    routerLink: function (item) {
      if (item.link) {
        if(item.link === 'CustomerService'){
          window.open('https://mpkf.weixin.qq.com/','_blank');
        }else{
          this.$router.push({
            path: item.link + '#/' + new Date().getTime()
          })
        }

      }
    }
  },
  computed:({
    ...mapState('snackbar', [
      'y', 'x', 'mode', 'timeout', 'text', 'color'
    ]),
    snackbarVisibleC: {
      get() {
        return this.$store.state.snackbar.snackbarVisible;
      },
      set(value) {
        this.closeSnackbar();
      }
    }
  }),
  name: 'App'
}
</script>
