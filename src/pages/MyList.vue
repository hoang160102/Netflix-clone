<template>
  <main-content>
    <div class="px-10 py-5">
      <h1 class="text-white text-4xl font-light">My List</h1>
      <div class="list-film my-6 flex flex-wrap">
        <film-card
          v-for="film in list"
          :key="film.id"
          :id="film.id"
          :image="film.poster_path"
          :type="film.type"
        ></film-card>
      </div>
    </div>
  </main-content>
</template>
<script>
import { auth } from "@/state/helpers";
import FilmCard from "@/layout/userList/FilmCard.vue";
export default {
  components: {
    FilmCard,
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...auth.authComputed,
    
  },
  methods: {
    ...auth.authMethods,
    async initial() {
      await this.getCurrentUser();
    },
  },
  async created() {
    await this.initial();
    this.list = this.fullInfoUser.userList;
  },
};
</script>
<style scoped></style>
