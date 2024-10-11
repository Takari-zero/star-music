<template>
  <div></div>
</template>

<script>
import { getNewSong } from "@/api/home";
export default {
  mounted() {
    getNewSong().then((data) => {
      console.log("~~~~~", data);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>