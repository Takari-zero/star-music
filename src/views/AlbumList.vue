<template>
  <div class="AlbumList">
    <div class="inner">
      <div class="header">
        <div class="img">
          <img :src="headerInfo?.picUrl" :alt="headerInfo?.name" />
        </div>
        <div class="right">
          <div class="album-name">{{ headerInfo?.name }}</div>
          <div class="other-info">
            <div>歌手：{{ headerInfo?.artists[0].name }}</div>
            <div>发行时间：{{ msToDate(headerInfo?.publishTime) }}</div>
            <div>发行公司：{{ headerInfo?.company }}</div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="introduce">专辑简介:</div>
        <TextFoldBox :text="headerInfo?.description" />
      </div>
      <div class="song-list">
        <SongsList :list="albumSongList" :info="headerInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import { getAlbumSongs } from "@/api/getAlbumSongs";
import TextFoldBox from "../components/TextFoldBox";
import SongsList from "../components/SongsList.vue";
import { msToDate } from "@/tools/timeChange";
export default {
  components: { TextFoldBox, SongsList },
  data() {
    return {
      headerInfo: null,
      msToDate,
      /* 
    img:headerInfo.picUrl
    song.name :headerInfo.name
    singer:headerInfo.artists[0].name
    发行时间：headerInfo.pub;ishTime
    发行公司：headerInfo.company
    简介：headerInfo.description
    */
      albumSongList: [],
    };
  },
  watch: {
    "$route.query.id": {
      immediate: true,
      handler(id) {
        getAlbumSongs(id).then((data) => {
          this.headerInfo = data.data.album;
          this.albumSongList = data.data.songs.map((i) => {
            return {
              id: i.id,
              name: i.name,
              singer: i.ar?.map((i) => i.name).join("，"),
              img: data.data.album.picUrl,
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
.AlbumList {
  .inner {
    width: $normal-width;
    margin: 0 auto;
    .header {
      margin: $gap auto;
      display: flex;

      .img {
        & > img {
          margin-right: 50px;
          @include wh($mid-img-size);
        }
      }
      .right {
        .album-name {
          font-size: $text-big2-size;
          font-weight: 700;
          margin-bottom: $s-gap;
        }
        .other-info {
          color: $text-gray-color;
          font-size: $text-small-size;
          & > div:not(:last-child) {
            margin-bottom: 3px;
          }
        }
      }
    }
    .main {
      .introduce {
        font-size: $text-small-size;
        font-weight: 700;
      }
    }
  }
}
</style>