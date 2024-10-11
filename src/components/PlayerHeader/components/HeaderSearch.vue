<template>
  <div class="all">
    <input
      type="text"
      class="search"
      v-model="keyWord"
      @keydown.enter="gotoSearchPage"
    />
    <i class="el-icon-search"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyWord: this.$route.query?.keyWord || "",
    };
  },
  methods: {
    gotoSearchPage() {
      if (this.keyWord.trim() === "") {
        return;
      }
      if (
        this.$route.path === "/sh" &&
        this.$route.query?.keyWord === this.keyWord
      ) {
        return;
      }
      this.$router.push({
        path: "/sh",
        query: {
          keyWord: this.keyWord,
        },
      });
    },
  },
  watch: {
    "$route.query.keyWord": {
      immediate: true,
      handler() {
        this.keyWord = this.$route.query?.keyWord;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.all {
  margin-left: 40px;
  position: relative;

  .search {
    width: 320px;
    border-radius: 16px;
    border: 1px solid $border-color;
    padding: 8px 18px;
    padding-left: 34px;
    margin: 0;
    outline: none;

    &:focus-visible {
      border: 1px solid $text-gray-color;
    }
  }

  .el-icon-search {
    position: absolute;
    top: 10px;
    left: 13px;
    color: $text-gray-color;
  }
}
</style>