<template>
  <div class="CenterFooter">
    <div v-if="TookItem" class="inner">
      <div class="img-box">
        <img
          class="img"
          :src="TookItem?.img"
          :alt="TookItem.id"
          @click="() => $emit('showOrCloseLyric')"
        />
        <div class="mask">
          <div class="icon">
            <i v-if="!isShowLyric" class="iconfont">&#xee30;</i>
            <i v-else class="iconfont">&#xee31;</i>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="info">
          <div></div>
          <div class="song-name">{{ TookItem?.name }}</div>
          <div class="playType">
            <el-tooltip
              effect="dark"
              content="顺序播放"
              placement="top"
              v-if="playTypeIndex === 0"
            >
              <i class="iconfont" @click="changePlayType">&#xe60b;</i>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="单曲循环"
              placement="top"
              v-else-if="playTypeIndex === 1"
            >
              <i class="iconfont" @click="changePlayType">&#xe61e;</i>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="随机"
              placement="top"
              v-else-if="playTypeIndex === 2"
            >
              <i class="iconfont" @click="changePlayType">&#xe60a;</i>
            </el-tooltip>
          </div>
        </div>
        <div class="singerAndSongTime">
          <div>{{ secondToMS(songNowTime) }}</div>
          <div class="singer">{{ TookItem?.singer }}</div>
          <div>{{ secondToMS(songTotalTime) }}</div>
        </div>
        <div class="slider">
          <el-slider
            input-size="mini"
            :value="songNowTime"
            :max="songTotalTime"
            @input="(val) => $emit('changeNowTime', val)"
            @change="(v) => $emit('changeAudioNowTime', v)"
          ></el-slider>
        </div>
      </div>
    </div>
    <div v-else class="no-Info">暂无歌曲信息</div>
  </div>
</template>

<script>
import { secondToMS } from "@/tools/timeChange";
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  props: ["songTotalTime", "songNowTime", "isShowLyric"],
  data() {
    return {
      starTime: null,
      endTime: null,
      secondToMS,
    };
  },
  computed: {
    ...mapGetters("song", ["TookItem"]),
    ...mapState("song", ["playTypeIndex"]),
  },

  methods: {
    ...mapMutations("song", ["changePlayType"]),
  },
};
</script>

<style lang="scss" scoped>
.CenterFooter {
  background-color: $bg-grey-color;
  height: 100%;
  position: relative;
  z-index: 2;
  .no-Info {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }
  .inner {
    display: flex;
    .img-box {
      position: relative;
      margin-right: $s-gap;
      @include wh($small-img-size);
      .img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        @include wh($small-img-size);
      }
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        @include wh($small-img-size);

        .icon {
          display: none;
          .iconfont {
            font-size: $text-big1-size;
            color: $bg-color;
          }
        }
      }
      &:hover .mask {
        position: absolute;
        z-index: 3;
        background-color: rgba($color: #000000, $alpha: 0.5);
      }
      &:hover .mask .icon {
        display: block;
      }

      // .no-img {
      //   background-color: $bg-grey-color;
      //   @include wh($small-img-size);
      // }
    }
    .right {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      margin: 0 $gap;
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-top: 3px;
        .playType {
          display: flex;
          width: 18px;
          & > i {
            cursor: pointer;
          }
        }
      }
      .singerAndSongTime {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: $text-small-size;
        color: $text-gray-color;
        padding: 3px 0;

        .singer {
          display: flex;
          justify-content: center;
        }
      }

      .slider {
        width: 100%;
        padding-right: $s-gap;
        margin-top: 3px;
        ::v-deep .el-slider__runway {
          margin: 0;
        }
      }
    }
  }
}
</style>