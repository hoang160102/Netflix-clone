<template>
  <main-content>
    <div class="loading pt-10 flex justify-center" v-if="loading">
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </div>
    <div v-else class="px-10 py-5">
      <h1 class="text-white text-4xl font-light">My List</h1>
      <div v-if="list" class="list-film my-6">
        <draggable
          v-model="list"
          :options="{ group: 'films', animation: 200 }"
          class="flex flex-wrap"
          >
          <div v-for="film in list" :key="film.id">
            <film-card
              :id="film.id"
              :image="film.poster_path"
              :type="film.type"
            ></film-card>
          </div>
        </draggable>
      </div>
    </div>
  </main-content>
</template>
<script>
import { auth } from "@/state/helpers";
import FilmCard from "@/layout/userList/FilmCard.vue";
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  components: {
    FilmCard,
    draggable: VueDraggableNext
  },
  data() {
    return {
      list: null,
      loading: false,
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
    this.loading = true;
    await this.initial();
    this.list = this.fullInfoUser.userList;
    this.loading = false;
  },
};
</script>
<style scoped></style>
