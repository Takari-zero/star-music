<template>
  <div class="SongsList">
    <div class="header">
      <div>歌曲名</div>
      <div>歌手</div>
      <div>专辑名</div>
      <div>操作</div>
    </div>
    <!-- {{ list }} -->
    <div
      class="item"
      v-for="item in list"
      :key="item.id"
      @dblclick="ToPalyMusic(item)"
    >
      <div class="song-name">{{ item?.name }}</div>
      <div class="singer">{{ item.singer }}</div>
      <div class="album">{{ item.album }}</div>
      <div class="action">
        <el-tooltip
          class="tooltip-add"
          effect="dark"
          content="添加到播放列表"
          placement="top"
        >
          <i class="iconfont" @click="AddToPlayList(item)">&#xe727;</i>
        </el-tooltip>

        <el-tooltip
          class="tooltip-download"
          effect="dark"
          content="下载"
          placement="top"
        >
          <i class="iconfont">&#xe606;</i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { getAlbumSongs } from "@/api/getAlbumSongs";
export default {
  props: ["list", "total"],
  computed: {
    ...mapState("song", ["songList"]),
  },
  methods: {
    ...mapActions("song", ["PalyMusic"]),
    ...mapMutations("song", ["OnlyAddToPlayList"]),
    AddToPlayList(item) {
      if (!item.img && item.albumId) {
        getAlbumSongs(item.albumId).then((data) => {
          item.img = data.data.album.picUrl;
          this.OnlyAddToPlayList(item);
        });
      } else {
        this.OnlyAddToPlayList(item);
      }
    },
    ToPalyMusic(item) {
      if (!item.img && item.albumId) {
        getAlbumSongs(item.albumId).then((data) => {
          item.img = data.data.album.picUrl;
          this.PalyMusic(item);
        });
      } else {
        this.PalyMusic(item);
      }
    },
    // ToPalyMusic(item) {
    //   this.PalyMusic({
    //     id: item.id,
    //     name: item.name,
    //     singer: item.ar?.map((i) => i.name).join("，"),
    //     img: item.img,
    //     // img: item.al.picUrl,
    //     album: item.al.name,
    //   });
    // },
    getInfo(item) {
      if (!item.img) {
        return getAlbumSongs(item.albumId).then((data) => {
          item.img = data.data.album.picUrl;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.SongsList {
  .header {
    display: flex;
    justify-content: space-between;
    padding: $s-gap;

    & > div:not(:last-child) {
      flex: 1;
    }
    & > div:last-child {
      width: 100px;
    }
  }
  .item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: $s-gap;
    &:nth-child(even) {
      background-color: $bg-grey-color;
    }
    & > div:not(.action) {
      flex: 1;
      @include ell;
    }

    .action {
      width: 100px;

      .tooltip-add {
        margin-right: $s-gap;
      }
    }
  }
}
</style>
