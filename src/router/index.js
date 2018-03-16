import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/HelloWorld'
import Insurance from '@/components/Insurance'
import News from '@/components/News'
import AddNews from '@/components/AddNews'
import EditNews from '@/components/EditNews'
import Carousel from '@/components/Carousel'
import AddCarousel from '@/components/AddCarousel'
import EditCarousel from '@/components/EditCarousel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/carousel',
      name: 'Carousel',
      component: Carousel
    },
    {
      path: '/addCarousel',
      name: 'AddCarousel',
      component: AddCarousel
    },
    {
      path: '/editCarousel',
      name: 'EditCarousel',
      component: EditCarousel
    },
    {
      path: '/insurance',
      name: 'Insurance',
      component: Insurance
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/addNews',
      name: 'AddNews',
      component: AddNews
    },
    {
      path: '/editNews',
      name: 'EditNews',
      component: EditNews
    }
  ]
})
