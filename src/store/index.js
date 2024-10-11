import Vue from 'vue'
import Vuex from 'vuex'
import { getSongUrl } from '@/api/getSongUrl'
import { getRandomInt } from '@/tools/random'
import { Message } from 'element-ui'
import { getSongLyric } from '@/api/getSongLyric'
import { LyricChangeToUse } from '@/tools/LyricChangeToUse'
import { setValueToLocalStorage, getValueFromLocalStorage } from '@/tools/localStorage'

Vue.use(Vuex)

function getSongIndex(item, songList) {
  for (let i = 0; i < songList.length; i++) {
    if (item.id === songList[i].id) {
      return i
    }
  }
  return -1
}

function saveSongList(songList) {
  setValueToLocalStorage('songList', songList)
}

const song = {
  namespaced: true,
  actions: {
    PalyMusic({ state, commit }, item) {
      let curItem
      const i = getSongIndex(item, state.songList)
      if (i !== -1) {
        curItem = state.songList[i]
        commit('playMusicIm', { i, curItem })
      } else {
        curItem = {
          ...item,
          lyricLoading: false,
          urlLoading: false,
          url: '',
          lyric: null,
        }
        commit('playMusicIm', { i, curItem })
      }
      if (!curItem.url && !curItem.urlLoading) {
        curItem.loading = true
        getSongUrl(curItem.id).then(data => {
          curItem.url = data.data.data[0].url
          curItem.urlLoading = false
          saveSongList(state.songList)
        })
      }
      if (!curItem.lyric && !curItem.lyricLoading) {
        curItem.lyricLoading = true
        getSongLyric(curItem.id).then(dataLy => {
          curItem.lyric = LyricChangeToUse(dataLy.data.lrc.lyric)
          curItem.lyricLoading = false
          saveSongList(state.songList)
        })
      }
    },
  },
  mutations: {
    // 请求完成的数据，添加到播放列表
    playMusicIm(state, { i, curItem }) {
      if (i === -1) {
        state.songList.push(curItem)
        saveSongList(state.songList) // xxxxxxxxxxxxxxxxxxxxx
        state.nowPlaySongIndex = state.songList.length - 1
      } else {
        state.nowPlaySongIndex = i
      }
      // cccccccccccccccc
      setValueToLocalStorage('nowPlaySongIndex', state.nowPlaySongIndex)
      state.Playing = true
    },
    OnlyAddToPlayList(state, item) {
      const idx = getSongIndex(item, state.songList)
      if (idx !== -1) {
        Message.error('歌曲已经添加过了')
      } else {
        // xxxxxxxxxxxxxxxxxxxxx
        state.songList.push({
          ...item,
          loading: false,
          url: '',
          lyric: null,
        })
        saveSongList(state.songList)
      }
    },
    changePlayIndex(state, i) {
      state.nowPlaySongIndex = +i
      setValueToLocalStorage('nowPlaySongIndex', state.nowPlaySongIndex) // ccccccccccccccc
    },
    playOrPause(state, isPlay) {
      state.Playing = isPlay
    },
    preSong(state) {
      if (state.songList.length <= 1 || state.nowPlaySongIndex === null) {
        return
      }
      if (state.nowPlaySongIndex === 0) {
        state.nowPlaySongIndex = state.songList.length - 1
      } else {
        state.nowPlaySongIndex--
      }
      setValueToLocalStorage('nowPlaySongIndex', state.nowPlaySongIndex) // ccccccccccccccccccc
      state.Playing = true
    },
    nextSong(state) {
      if (state.songList.length <= 1 || state.nowPlaySongIndex === null) {
        return
      }
      let a
      switch (state.playTypeIndex) {
        case 0:
        case 1:
          if (state.nowPlaySongIndex === state.songList.length - 1) {
            state.nowPlaySongIndex = 0
          } else {
            state.nowPlaySongIndex++
          }
          break
        case 2:
          do {
            a = getRandomInt(state.songList.length, 0)
          } while (state.nowPlaySongIndex === a)
          state.nowPlaySongIndex = a
          break
      }
      setValueToLocalStorage('nowPlaySongIndex', state.nowPlaySongIndex) // ccccccccccccccccccccc
      state.Playing = true
    },
    changePlayType(state) {
      if (state.playType.length - 1 === state.playTypeIndex) {
        state.playTypeIndex = 0
      } else {
        state.playTypeIndex++
      }
      setValueToLocalStorage('playTypeIndex', state.playTypeIndex)
    },
    deleteAllSong(state) {
      state.songList = [] // xxxxxxxxxxxxxxxxxxxxx
      saveSongList(state.songList)
      state.nowPlaySongIndex = null
      setValueToLocalStorage('nowPlaySongIndex', state.nowPlaySongIndex) // cccccccccccccccccc
      state.Playing = false
    },
    deleteSong(state, index) {
      if (state.songList.length === 1) {
        state.nowPlaySongIndex = null
        state.Playing = false
      } else if (index === state.songList.length - 1 && index === state.nowPlaySongIndex) {
        state.nowPlaySongIndex = 0
      }
      state.songList.splice(index, 1)
      saveSongList(state.songList) // xxxxxxxxxxx
      setValueToLocalStorage('nowPlaySongIndex', state.nowPlaySongIndex) // cccccccccccccccccccccccccc
    },
  },
  state: {
    Playing: false,
    songList: getValueFromLocalStorage('songList', []),
    nowPlaySongIndex: getValueFromLocalStorage('nowPlaySongIndex', null),
    playType: ['order', 'single', 'random'],
    playTypeIndex: getValueFromLocalStorage('playTypeIndex', 0),
  },
  getters: {
    TookItem(state) {
      return state.songList[state.nowPlaySongIndex]
    },
  },
}

const store = new Vuex.Store({
  modules: {
    song,
  },
})

export default store
