<template>
  <div class="RecommendPlayList">
    <div class="inner">
      <div class="header">推荐歌单</div>
      <div class="main">
        <div class="item" v-for="item in list" :key="item.id" @click="toSongSingerList(item.id)">
          <div class="img-box">
            <img class="img" :src="item.picUrl" :alt="item.name" />
          </div>
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendPlayList } from '@/api/home'
// import CoverList from "@/components/CoverList.vue";
export default {
  // components: { CoverList },
  data() {
    return {
      list: null,
    }
  },
  mounted() {
    getRecommendPlayList(12).then(data => {
      this.list = data.data.result
    })
  },
  methods: {
    toSongSingerList(id) {
      this.$router.push({
        path: '/ssl',
        query: {
          id,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.RecommendPlayList {
  margin-bottom: $gap;
  .inner {
    width: $normal-width;
    margin: 0 auto;

    .header {
      font-weight: 600;
      margin-bottom: 6px;
    }

    .main {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: $gap;
      padding-top: $gap;
      border-top: 1px solid $border-color;
      .item {
        cursor: pointer;
        .img {
          @include wh($mid-img-size);
        }
        .text {
          max-width: $mid-img-size;
          @include ell(2);
        }
      }
    }
  }
}
</style>
