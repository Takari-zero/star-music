<template>
  <div class="HeaderLogo" @click="toHome">
    <h1>
      <i class="iconfont">&#xe600;</i>
      <div>星星音乐</div>
    </h1>
  </div>
</template>

<script>
export default {
  methods: {
    toHome() {
      if (this.$route.path === "/") {
        return;
      }
      this.$router.replace({
        path: "/",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.HeaderLogo {
  padding: $gap 0;
  cursor: pointer;
  h1 {
    margin: 0;
    display: flex;
    align-items: center;
    font-size: $text-big2-size;
    i {
      font-size: $top-herder-icon;
    }
  }
}
</style>