<template>
  <div class="AlbumList">
    <div class="inner">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="toAlbumList(item.id)"
      >
        <div class="img">
          <img :src="item.picUrl" :alt="item.name" />
        </div>
        <div class="album-name">{{ item.name }}</div>
        <div class="artists">{{ item.artists[0].name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    toAlbumList(id) {
      this.$router.push({
        path: "/alb",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.AlbumList {
  .inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $gap;
    .item {
      .img {
        & > img {
          @include wh($mid-img-size);
        }
      }

      .album-name {
        margin-bottom: 2px;
        max-width: 150px;
        @include ell;
      }
      .artists {
        font-size: $text-small-size;
        color: $text-gray-color;
        max-width: 150px;
        @include ell;
      }
    }
  }
}
</style>