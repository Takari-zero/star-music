<template>
  <div>
    <SongsList :list="songList" :total="total" />
  </div>
</template>

<script>
import SongsList from "@/components/SongsList.vue";
export default {
  name: "SingleSong",
  props: ["list", "total"],
  components: { SongsList },
  computed: {
    songList() {
      // const list = [];
      // for (let i = 0; i < this.list.length; i++) {
      //   const info = {
      //     id: this.list[i].id,
      //     name: this.list[i].name,
      //     singer: this.list[i].ar.map((i) => i.name).join(","),
      //     img: this.list[i].al.picUrl,
      //     album: this.list[i].al.name,
      //   };

      //   list.push(info);
      //   // ,name,singer,img,album
      // }
      // return list;
      return this.list.map((i) => {
        return {
          id: i.id,
          name: i.name,
          singer: i.ar.map((i) => i.name).join("，"),
          img: i.al.picUrl,
          album: i.al.name,
        };
      });
    },
  },
};
</script>

<style>
</style>