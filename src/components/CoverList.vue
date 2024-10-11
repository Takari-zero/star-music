<template>
  <div class="CoverList">
    <div
      class="item"
      v-for="(item, index) in list"
      :key="item.id"
      @click="$emit('clickItem', item, index)"
    >
      <div class="img-box">
        <img :src="item.img" :alt="item.name" />
        <slot class="on-img" name="on-img" :item="item" :index="index" />
      </div>
      <slot name="bottom" :item="item" :index="index" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
};
</script>

<style lang="scss" scoped>
.CoverList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: $gap;
  .item {
    margin-bottom: 10px;
    .img-box {
      position: relative;
      & > img {
        @include wh($mid-img-size);
      }
    }
  }
}
</style>