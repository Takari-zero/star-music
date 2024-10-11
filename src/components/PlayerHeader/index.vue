<template>
  <div class="PlayerHeader">
    <div class="inner">
      <div class="left">
        <HeaderLogo />
        <HeaderSearch />
      </div>
      <div class="right">
        <HeaderNav />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogo from "./components/HeaderLogo.vue";
import HeaderNav from "./components/HeaderNav.vue";
import HeaderSearch from "./components/HeaderSearch.vue";

export default {
  name: "PlayerHeader",
  components: { HeaderLogo, HeaderNav, HeaderSearch },
};
</script>

<style lang="scss" scoped>
.PlayerHeader {
  width: 100%;
  background-color: $bg-grey-color;
  border-bottom: 1px solid $border-color;
  .inner {
    width: $normal-width;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
    }
  }
}
</style>