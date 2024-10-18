<template>
  <div class="MusicHomepage">
    <AppBanner />
    <RecommendPlayList />
  </div>
</template>

<script>
import AppBanner from './components/AppBanner.vue'
import RecommendPlayList from './components/RecommendPlayList.vue'
export default {
  name: 'MusicHomepage',
  components: { AppBanner, RecommendPlayList },
}
</script>

<style lang="scss" scoped></style>
