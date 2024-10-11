<template>
  <div class="TextFoldBox">
    <div
      class="text-box"
      :style="{ height: isOpen ? `${realHeight}px` : `123px` }"
    >
      <div ref="text" class="text">
        <p
          v-for="(item, index) in text?.split('\n') || []"
          :key="`${item}-${index}`"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <div class="action" v-if="realHeight > 123">
      <div v-if="!isOpen" @click="changeOpen">展开</div>
      <div v-else @click="changeOpen">收起</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      isOpen: false,
      realHeight: 0,
    };
  },
  methods: {
    changeOpen() {
      this.isOpen = !this.isOpen;
    },
    getRealHeight() {
      if (!this.$refs.text) {
        return;
      }
      this.realHeight = this.$refs.text.getBoundingClientRect().height;
    },
  },
  watch: {
    text() {
      this.$nextTick(() => {
        this.getRealHeight();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.TextFoldBox {
  color: $text-gray-color;
  .text-box {
    overflow: hidden;
    .text {
      box-sizing: border-box;
      // padding: 1px;
      overflow: auto;
      p {
        text-indent: 2em;
        margin: 0;
        line-height: 1.7;
      }
    }
  }

  .action {
    width: 100%;
    display: flex;
    justify-content: end;
    // &.action {
    //   display: none;
    // }
    & > div {
      @include link;
    }
  }
}
</style>