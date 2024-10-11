<template>
  <div class="AppBanner">
    <div class="inner">
      <el-carousel :interval="3000" type="card" height="300px">
        <el-carousel-item v-for="item in list" :key="item.targetId">
          <img class="img" :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { getBanner } from "@/api/home";
export default {
  data() {
    return {
      list: null,
    };
  },
  mounted() {
    getBanner().then((data) => {
      this.list = data.data.banners;
    });
  },
};
</script>

<style lang="scss" scoped>
.AppBanner {
  margin-bottom: $gap;
  .inner {
    margin: 0 auto;
    width: $plus-width;
    .img {
      width: 700px;
      height: 260px;
    }
  }
}
</style>