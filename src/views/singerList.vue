<template>
  <div class="singerList">
    <div class="inner">
      <div class="header">
        <div class="img-box">
          <img class="img" :src="headerInfo?.picUrl" :alt="headerInfo?.name" />
        </div>
        <div class="right">
          <div class="name">{{ headerInfo?.name }}</div>
          <div class="info">
            <div>歌曲数：{{ headerInfo?.musicSize }}</div>
            <div>专辑数：{{ headerInfo?.albumSize }}</div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="introduce">歌手简介：</div>
        <TextFoldBox :text="headerInfo?.briefDesc" />
      </div>
      <div class="songs">
        <SongsList :list="AllSongsList" />
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerSongs } from "@/api/getSingerSongs";
import TextFoldBox from "@/components/TextFoldBox";
import SongsList from "@/components/SongsList.vue";
export default {
  components: { TextFoldBox, SongsList },
  data() {
    return {
      headerInfo: null,
      AllSongsList: null,
    };
  },
  watch: {
    "$route.query.id": {
      immediate: true,
      handler() {
        getSingerSongs(this.$route.query.id).then((data) => {
          this.headerInfo = data.data.artist;
          this.AllSongsList = data.data.hotSongs.map((i) => {
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
.singerList {
  .inner {
    width: $normal-width;
    margin: 0 auto;

    .main {
      .introduce {
        font-weight: 700;
      }
    }

    .header {
      display: flex;
      margin: $gap auto;
      .img-box {
        .img {
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
        .info {
          font-size: $text-small-size;
          color: $text-gray-color;
          & > div:not(:last-child) {
            margin-bottom: 3px;
          }
        }
      }
    }
  }
}
</style>