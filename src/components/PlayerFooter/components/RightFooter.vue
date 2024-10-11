<template>
  <div class="RightFooter">
    <i class="iconfont list" @click="$emit('listControl')">&#xe636;</i>
    <i
      v-if="!IsPause"
      class="iconfont play-or-pause"
      @click="() => $emit('ControlMute')"
      >&#xe87a;</i
    >
    <i v-else class="iconfont play-or-pause" @click="() => $emit('ControlMute')"
      >&#xea0b;</i
    >
    <el-slider
      class="slider"
      :value="volume"
      @input="(val) => $emit('changeVolume', val)"
    ></el-slider>
  </div>
</template>

<script>
export default {
  props: ["volume", "IsPause"],
};
</script>

<style lang="scss" scoped>
.RightFooter {
  display: flex;
  align-items: center;
  background-color: $bg-color;
  z-index: 2;
  & > i {
    font-size: $text-big2-size;
    color: $text-big2-size;
    cursor: pointer;
    &.list {
      padding-left: $gap;
    }
    &.play-or-pause {
      padding: 0 12px;
    }
  }
  .slider {
    width: 160px;
    margin-right: $big-gap;
  }
}
</style>