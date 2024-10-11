import Vue from 'vue'
import VueRouter from 'vue-router'
import HeaderAndPlayer from '../views/HeaderAndPlayer.vue'
import AppLogin from '../views/AppLogin.vue'
import MusicHomepage from '../views/MusicHomepage'
import MyMusic from '../views/MyMusic.vue'
import SearchPage from '../views/SearchPage'
import AlbumList from '../views/AlbumList.vue'
import singerList from '../views/singerList.vue'
import SongSingerList from '../views/SongSingerList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: HeaderAndPlayer,
      children: [
        {
          path: '',
          component: MusicHomepage,
        },
        {
          path: 'music',
          component: MyMusic,
        },
        {
          path: 'sh',
          component: SearchPage,
        },
        {
          path: 'alb',
          component: AlbumList,
        },
        {
          path: 'sl',
          component: singerList,
        },
        {
          path: 'ssl',
          component: SongSingerList,
        },
      ],
    },
    {
      path: '/log',
      component: AppLogin,
    },
    // {
    //   path: '',
    //   redirect: HeaderAndPlayer,
    // },
  ],
})

export default router
