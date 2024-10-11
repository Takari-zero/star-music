<template>
  <div class="LeftFooter">
    <i class="iconfont pre" @click="changeToPreSong">&#xe718;</i>
    <i v-if="Playing" class="iconfont Pause" @click="playOrPause(false)"
      >&#xe622;</i
    >
    <i v-else class="iconfont play" @click="playOrPause(true)">&#xe623;</i>

    <i class="iconfont next" @click="changeToNextSong">&#xe719;</i>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("song", ["Playing"]),
  },
  methods: {
    ...mapMutations("song", ["playOrPause", "preSong", "nextSong"]),
    changeToPreSong() {
      this.preSong();
    },
    changeToNextSong() {
      this.nextSong();
    },
  },
};
</script>

<style lang="scss" scoped>
.LeftFooter {
  display: flex;
  align-items: center;
  background-color: $bg-color;
  z-index: 2;
  .iconfont {
    font-size: $top-herder-icon;
    cursor: pointer;
    &.pre {
      padding-left: $big-gap;
    }
    &.play {
      padding: 0 $gap;
    }
    &.Pause {
      padding: 0 $gap;
    }
    &.next {
      padding-right: $big-gap;
    }
  }
}
</style>