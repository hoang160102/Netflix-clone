<template>
  <main-content>
    <div class="loading pt-10 flex justify-center" v-if="loading">
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </div>
    <div v-else class="search mx-auto px-5 py-5">
      <h1 class="text-white text-4xl font-light">Search</h1>
      <div v-if="searchedFilm.length > 2" class="list my-6 flex flex-wrap">
        <div class="film" v-for="movie in searchedFilm" :key="movie.id">
          <div class="m-5" v-if="movie.poster_path">
            <movie-list
              :id="movie.id"
              :image="movie.poster_path"
              :type="movie.media_type"
            ></movie-list>
          </div>
        </div>
      </div>
      <div class="mt-4 text-slate-400" v-else>There are no movies</div>
    </div>
  </main-content>
</template>

<script>
import { movies } from "@/state/helpers";
import MovieList from "@/layout/layoutSlider/MovieList.vue";
// import router from "@/router";
export default {
  components: {
    MovieList,
  },
  data() {
    return {
      searchedFilm: null,
      loading: false,
    };
  },
  computed: {
    ...movies.moviesComputed,
  },
  methods: {
    ...movies.moviesMethods,
    async initial() {
      this.loading = true;
      await this.searchFilm(this.$route.params.search);
      this.searchedFilm = this.filmSearching;
      this.loading = false;
    },
  },
  async created() {
    await this.initial();
  },
};
</script>

<style scoped>
.m-5 {
  width: 250px;
}
.search {
  max-width: 1800px;
}
</style>
