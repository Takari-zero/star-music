<template>
  <div class="singerSong">
    <div
      class="item"
      v-for="item in list"
      :key="item.id"
      @click="toSongList(item.id)"
    >
      <div>
        <img class="img" :src="item.picUrl" :alt="item.name" />
      </div>
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    toSongList(id) {
      this.$router.replace({
        path: "/sl",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.singerSong {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: $gap;
  .item {
    .img {
      @include wh($mid-img-size);
    }
    .name {
      max-width: 150xp;
      @include ell;
    }
  }
}
</style>