<template>
  <div class="HeaderNav">
    <router-link to="/home">主页</router-link>
    <router-link to="/music">我的音乐</router-link>
    <router-link to="/log">登录</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.HeaderNav {
  a {
    text-decoration: none;
    color: $text-gray-color;
    &:not(:last-child) {
      margin-right: $gap;
    }
    &:hover {
      @include link(4);
    }
  }
}
</style>