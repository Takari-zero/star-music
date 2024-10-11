<template>
  <div class="HeaderAndPlayer">
    <PlayerHeader />
    <div class="router-view">
      <router-view></router-view>
    </div>

    <PlayerFooter />
  </div>
</template>

<script>
import PlayerHeader from "@/components/PlayerHeader";
import PlayerFooter from "@/components/PlayerFooter";
export default {
  components: { PlayerHeader, PlayerFooter },
};
</script>

<style lang="scss" scoped>
.HeaderAndPlayer {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .router-view {
    // height: calc(100vh - 61px - 74.3px);
    flex: 1;
    overflow: auto;
  }
}
</style>
