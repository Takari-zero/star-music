<template>
  <div>
    <CoverList :list="listNeedInfo" @clickItem="clickItem">
      <template #on-img="{ item }">
        <div class="cover">
          <i class="iconfont">&#xea10;</i>
          <div>{{ item.playCount }}</div>
        </div>
      </template>
      <template #bottom="{ item }">
        <div class="bottom">
          {{ item.name }}
        </div>
      </template>
    </CoverList>
  </div>
</template>

<script>
import CoverList from "@/components/CoverList.vue";
export default {
  props: ["list"],
  components: { CoverList },
  computed: {
    listNeedInfo() {
      return this.list.map((i) => {
        return {
          id: i.id,
          img: i.coverImgUrl,
          name: i.name,
          playCount: i.playCount,
        };
      });
    },
  },
  methods: {
    clickItem(item) {
      this.$router.push({
        path: "/ssl",
        query: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cover {
  position: absolute;
  bottom: 3px;
  display: flex;
  align-items: center;
  color: $bg-color;
  background-color: rgba($color: #000000, $alpha: 0.7);
  width: $mid-img-size;
  .iconfont {
    margin: 0 5px;
  }
}

.bottom {
  max-width: $mid-img-size;
  @include ell;
}
</style>