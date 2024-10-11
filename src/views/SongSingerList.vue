<template>
  <div class="SongSingerList">
    <div class="inner">
      <div class="header">
        <div class="img-box">
          <img :src="headInfo?.coverImgUrl" :alt="headInfo?.name" />
        </div>
        <div class="right">
          <div class="name">{{ headInfo?.name }}</div>
          <div class="user-info">
            <div class="user-img">
              <img
                :src="headInfo?.creator.avatarUrl"
                :alt="headInfo?.creator.nickname"
              />
            </div>
            <div class="username">{{ headInfo?.creator.nickname }}</div>
            <div class="create-time">{{ msToDate(headInfo?.createTime) }}</div>
          </div>
          <div class="tag">
            <div>标签：</div>
            <div class="item" v-for="item in headInfo?.tags" :key="item">
              <el-tag size="mini">{{ item }}</el-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="intr">歌单介绍：</div>
        <div>
          <TextFoldBox :text="headInfo?.description" />
        </div>
      </div>
      <div><singerList :list="songsList" /></div>
    </div>
  </div>
</template>

<script>
import { getSongSingerSongs } from "@/api/getSongSingerSongs";
import TextFoldBox from "@/components/TextFoldBox.vue";
import singerList from "@/components/SongsList.vue";
import { msToDate } from "@/tools/timeChange";
export default {
  components: { TextFoldBox, singerList },
  data() {
    return {
      headInfo: null,
      msToDate,
      songsList: null,
    };
  },
  watch: {
    "$route.query.id": {
      immediate: true,
      handler(val) {
        getSongSingerSongs(val).then((data) => {
          this.headInfo = data.data.playlist;
          this.songsList = data.data.playlist.tracks.map((i) => {
            return {
              id: i.id,
              name: i.name,
              singer: i.ar?.map((i) => i.name).join("，"),
              albumId: i.al.id,
              album: i.al.name,
            };
          });
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.SongSingerList {
  .inner {
    width: $normal-width;
    margin: 0 auto;
    .header {
      display: flex;
      margin: $gap 0;
      .img-box {
        & > img {
          margin-right: 50px;
          @include wh($mid-img-size);
        }
      }
      .right {
        .name {
          font-size: $text-big2-size;
          font-weight: 700;
          margin-bottom: $s-gap;
        }
        .user-info {
          display: flex;
          align-items: center;
          color: $text-gray-color;
          font-size: $text-small-size;
          margin-bottom: $s-gap;
          & > div:not(:last-child) {
            margin-right: $s-gap;
          }
          .user-img {
            & > img {
              @include wh($mini-img-size);
            }
          }
        }

        .tag {
          display: flex;
          color: $text-gray-color;
          font-size: $text-small-size;
          align-items: center;
          .item:not(:last-child) {
            margin-right: $s-gap;
          }
        }
      }
    }

    .main {
      .intr {
        font-weight: 700;
      }
    }
  }
}
</style>