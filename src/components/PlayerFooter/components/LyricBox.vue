<template>
  <div class="lyric-box" :style="{ top: isShowLyric ? `calc(-100vh + 61px)` : '0px' }">
    <div class="icon">
      <i class="iconfont" @click="$emit('showOrCloseLyric')">&#xee31;</i>
    </div>
    <div class="inner">
      <div class="img-box">
        <img class="img" :src="TookItem?.img" :alt="TookItem?.id" />
      </div>
      <div class="right">
        <div class="song">{{ TookItem?.name }}</div>
        <div class="info">
          <div class="singer">歌手：{{ TookItem?.singer }}</div>
          <div class="albumName">专辑名：{{ TookItem?.album }}</div>
        </div>
        <div class="lyric">
          <div v-for="(item, index) in TookItem?.lyric" :class="{ active: index === nowSongLyricIndex }" class="lyric-item" :key="item.time">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['isShowLyric', 'songNowTime'],
  data() {
    return {
      // nowSongLyricIndex: null,
    }
  },
  computed: {
    ...mapGetters('song', ['TookItem']),
    nowSongLyricIndex() {
      if (this.TookItem?.lyric === []) {
        return -1
      }
      for (let i = 0; i < this.TookItem?.lyric?.length; i++) {
        if (this.TookItem.lyric[i].time > this.songNowTime) {
          return i - 1
        }
      }
      return -1
    },
  },
}
</script>

<style lang="scss" scoped>
.lyric-box {
  position: absolute;
  // bottom: 61px;
  // top: 0px;
  width: 100%;
  z-index: 0;
  height: calc(100vh - 61px);
  background-color: $bg-color;
  // display: none;
  transition: 0.3s;
  .icon {
    position: absolute;
    top: $text-big2-size;
    left: $text-big2-size;
    .iconfont {
      font-size: $text-big2-size;
      color: $text-gray-color;
      cursor: pointer;
    }
  }
  .inner {
    width: $normal-width;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    .img-box {
      margin-right: 60px;
      margin-top: 100px;

      .img {
        @include wh($big-img-size);
      }
    }
    .right {
      margin-top: 100px;

      .song {
        margin-bottom: $s-gap;
      }
      .info {
        display: flex;
        font-size: $text-small-size;
        & > div:not(:last-child) {
          margin-right: $big-gap;
          margin-bottom: $gap;
        }
        .singer {
          width: 120px;
          @include ell;
        }
        .albumName {
          width: 280px;
          @include ell;
        }
      }
      .lyric {
        width: 500px;
        height: 450px;
        overflow-y: auto;
        border-top: 1px solid $border-color;
        .lyric-item {
          margin-top: $s-gap;
          color: $text-gray-color;
          &.active {
            font-size: $text-big2-size;
            color: #000;
          }
        }
      }
    }
  }
}
</style>
