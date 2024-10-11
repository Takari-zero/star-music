<template>
  <div class="PlayerFooter">
    <LeftFooter />
    <div class="center">
      <SongListBox :isShow="isShow" />
      <CenterFooter
        :songTotalTime="songTotalTime"
        :songNowTime="songNowTime"
        :isShowLyric="isShowLyric"
        @changeNowTime="changeNowTime"
        @changeAudioNowTime="changeAudioNowTime"
        @showOrCloseLyric="showOrCloseLyric"
      />
    </div>
    <RightFooter
      :volume="volume"
      :IsPause="IsPause"
      @listControl="listControl"
      @changeVolume="changeVolume"
      @ControlMute="ControlMute"
    />
    <div class="audio">
      <audio
        ref="audio"
        :src="TookItem?.url"
        @loadedmetadata="loaded"
        @timeupdate="timeupdate"
        @ended="songEnded"
        @pause="playOrPause(false)"
        @play="playOrPause(true)"
        controls
      ></audio>
    </div>
    <LyricBox
      :isShowLyric="isShowLyric"
      :songNowTime="songNowTime"
      @showOrCloseLyric="showOrCloseLyric"
    />
  </div>
</template>

<script>
import LeftFooter from "./components/LeftFooter.vue";
import CenterFooter from "./components/CenterFooter.vue";
import RightFooter from "./components/RightFooter.vue";
import SongListBox from "./components/SongListBox.vue";
import LyricBox from "./components/LyricBox.vue";
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "PlayerFooter",
  data() {
    return {
      isShow: false,
      volume: 20,
      IsPause: false,
      songTotalTime: 0,
      songNowTime: 0,
      isShowLyric: false,
    };
  },
  components: { LeftFooter, CenterFooter, RightFooter, SongListBox, LyricBox },
  computed: {
    ...mapGetters("song", ["TookItem"]),
    ...mapState("song", ["playTypeIndex", "Playing"]),
  },
  methods: {
    ...mapMutations("song", ["nextSong", "playOrPause"]),
    listControl() {
      this.isShow = !this.isShow;
    },
    changeVolume(val) {
      this.IsPause = false;
      this.volume = +val;
      this.$refs.audio.volume = this.volume / 100;
    },
    loaded() {
      this.songTotalTime = this.$refs.audio.duration;
    },
    timeupdate() {
      this.songNowTime = this.$refs.audio.currentTime;
    },
    ControlMute() {
      this.IsPause = !this.IsPause;

      if (this.IsPause === true) {
        this.$refs.audio.volume = 0;
        return;
      }
      if (this.IsPause === false) {
        this.$refs.audio.volume = this.volume / 100;
        return;
      }
    },
    changeAudioNowTime(v) {
      this.songNowTime = v;
      this.$refs.audio.currentTime = +v;
    },
    changeNowTime(val) {
      this.songNowTime = val;
    },
    songEnded() {
      if (this.playTypeIndex === 1) {
        this.$refs.audio.play();
      } else {
        this.nextSong();
      }
    },
    showOrCloseLyric() {
      this.isShowLyric = !this.isShowLyric;
    },
    checkCanPlay() {
      if (this.TookItem?.url && this.Playing) {
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
      } else {
        this.$nextTick(() => {
          this.$refs.audio.pause();
        });
      }
      // if (!this.$store.getters["song/TookItem"]?.url) {
      //   return;
      // }
      // if (this.$store.state.song.Playing === true) {
      //   this.$nextTick(() => {
      //     this.$refs.audio.play();
      //   });
      //   return;
      // }
      // this.$nextTick(() => {
      //   this.$refs.audio.pause();
      // });
    },
  },
  watch: {
    Playing: {
      immediate: true,
      handler() {
        this.checkCanPlay();
      },
    },
    "TookItem.url": {
      immediate: true,
      handler() {
        this.checkCanPlay();
      },
    },
    // "$store.state.song.playTypeIndex": {
    //   immediate: true,
    //   handler() {
    //     if (this.$store.state.song.playTypeIndex === 1) {
    //     }
    //   },
    // },
  },
};
</script>

<style lang="scss" scoped>
.PlayerFooter {
  display: flex;
  position: relative;
  background-color: $bg-grey-color;
  justify-content: space-between;
  background-color: $bg-color;
  border-top: 1px solid $border-color;

  .audio {
    display: none;
  }
  .center {
    flex: 1;
    position: relative;
    // overflow: hidden;
  }
}
</style>