<template>
  <div class="MusicHomepage">
    <AppBanner />
    <RecommendPlayList />
    <NewDisc />
  </div>
</template>

<script>
import NewDisc from "./components/NewDisc.vue";
import AppBanner from "./components/AppBanner.vue";
import RecommendPlayList from "./components/RecommendPlayList.vue";
export default {
  name: "MusicHomepage",
  components: { NewDisc, AppBanner, RecommendPlayList },
};
</script>

<style lang="scss" scoped>
</style>