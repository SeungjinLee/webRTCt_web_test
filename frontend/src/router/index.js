import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/IndexPage'
import Show from '@/components/ShowPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/:id',
      name: 'show',
      component: Show
    }
  ]
})
