<template>
  <div class="SearchPage">
    <div class="search-page-header">
      <div
        :class="{ active: nowTypeIndex === index }"
        v-for="(item, index) in searchTypes"
        :key="item.value"
        @click="changeType(index)"
      >
        {{ item.text }}
      </div>
    </div>
    <div>
      <SingleSong v-if="nowTypeIndex === 0" :list="singleList" :total="total" />
      <AlbumSong v-else-if="nowTypeIndex === 1" :list="albumList" />
      <singerSong v-else-if="nowTypeIndex === 2" :list="singerSongList" />
      <SongSinger v-else-if="nowTypeIndex === 3" :list="SongSingerList" />
    </div>
    <div class="Pagination">
      <el-pagination
        layout="prev, pager, next"
        @current-change="changePage"
        :total="total"
        :current-page="nowPage"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { SearchMusic } from "@/api/SearchMusic";
import SingleSong from "./components/SingleSong.vue";
import AlbumSong from "./components/AlbumSong.vue";
import singerSong from "./components/singerSong.vue";
import SongSinger from "./components/SongSinger.vue";
export default {
  name: "SearchPage",
  components: { SingleSong, AlbumSong, singerSong, SongSinger },
  data() {
    return {
      nowTypeIndex: +this.$route.query.nowTypeIndex || 0,
      nowPage: +this.$route.query.nowPage || 1,
      searchTypes: [
        {
          text: "单曲",
          value: "1",
        },
        {
          text: "专辑",
          value: "10",
        },
        {
          text: "歌手",
          value: "100",
        },
        {
          text: "歌单",
          value: "1000",
        },
      ],
      total: 0,
      singleList: [],
      albumList: [],
      singerSongList: [],
      SongSingerList: [],
      limit: 18,
    };
  },
  mounted() {
    this.getSongsList();
  },
  methods: {
    changeType(index) {
      if (this.nowTypeIndex === index) {
        return;
      }
      this.nowTypeIndex = index;
      this.$router.replace({
        query: {
          ...this.$route.query,
          nowTypeIndex: index,
        },
      });
      this.resetNowPage();
      this.getSongsList();
    },
    changePage(val) {
      this.nowPage = val;
      this.$router.replace({
        query: {
          ...this.$route.query,
          nowPage: this.nowPage,
        },
      });
      this.getSongsList();
    },
    resetNowPage() {
      if (this.$route.query.nowPage === "1") {
        return;
      }
      this.$router.replace({
        query: {
          ...this.$route.query,
          nowPage: 1,
        },
      });
    },
    getSongsList() {
      SearchMusic(
        this.$route.query.keyWord,
        this.limit,
        (this.nowPage - 1) * this.limit,
        this.searchTypes[this.nowTypeIndex].value
      ).then((data) => {
        switch (this.nowTypeIndex) {
          case 0:
            this.singleList = data.data.result.songs;
            this.total = +data.data.result.songCount;
            break;
          case 1:
            this.albumList = data.data.result.albums;
            this.total = +data.data.result.albumCount;
            break;
          case 2:
            this.singerSongList = data.data.result.artists;
            this.total = +data.data.result.artistCount;
            break;
          case 3:
            this.SongSingerList = data.data.result.playlists;
            this.total = data.data.result.playlistCount;
        }
      });
    },
  },
  watch: {
    // 监视关键词的内容，变了发路由，并重新请求
    "$route.query.keyWord": {
      handler() {
        this.resetNowPage();
        this.getSongsList();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.SearchPage {
  width: $normal-width;
  margin: 0 auto;

  .search-page-header {
    display: flex;
    padding: 12px 0;
    margin-left: $s-gap;

    & > div {
      @include link(4);
    }
    & > div:not(:last-child) {
      margin-right: $gap;
    }
  }

  .Pagination {
    display: flex;
    justify-content: center;
  }
}
</style>