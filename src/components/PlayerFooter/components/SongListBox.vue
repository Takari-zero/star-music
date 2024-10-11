<template>
  <div
    class="SongListBox"
    :style="{
      top: isShow ? `-${35 + Math.min(songList.length, 10) * 34}px` : '0px',
    }"
  >
    <div class="head">
      <div>共{{ songList.length }}首</div>
      <div @click="deleteAllSong">清空</div>
    </div>
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in songList"
        :key="item.id"
        @dblclick="PalyMusic(item)"
      >
        <div class="name">{{ item.name }}</div>
        <div class="singer">{{ item.singer }}</div>
        <div class="action">
          <el-tooltip effect="dark" content="删除" placement="top">
            <i class="iconfont" @click="deleteSong(index)">&#xe8bf;</i>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: ["isShow"],
  computed: {
    ...mapState("song", ["songList"]),
  },
  methods: {
    ...mapMutations("song", ["deleteAllSong", "deleteSong"]),
    ...mapActions("song", ["PalyMusic"]),
  },
};
</script>

<style lang="scss" scoped>
.SongListBox {
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: #fff;
  // overflow: hidden;
  transition: 0.2s;
  z-index: 1;
  .head {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px $gap;
    border: 1px solid $border-color;
    border-bottom: none;
  }
  .list {
    overflow-y: auto;
    max-height: 340px;
    border: 1px solid $border-color;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 8px $gap;
      cursor: pointer;

      &:nth-child(odd) {
        background-color: $bg-grey-color;
      }

      .name {
        flex: 3;
        @include ell;
      }
      .singer {
        flex: 2;
        @include ell;
      }
      .action {
        cursor: pointer;
      }
    }
  }
}
</style>