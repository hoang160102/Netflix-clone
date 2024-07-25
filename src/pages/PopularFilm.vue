<template>
  <main-content>
    <div class="loading pt-10 flex justify-center" v-if="loading">
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </div>
    <section v-else>
      <div class="popular-movie mx-auto px-5 py-5">
        <h1 class="text-white text-4xl font-light">Popular Movies</h1>
        <div class="list my-6 flex flex-wrap">
          <div class="m-5" v-for="movie in commonMovies" :key="movie.id">
            <movie-list
            :id="movie.id"
            :image="movie.poster_path"
            type="movie"></movie-list>
          </div>
        </div>
      </div>
      <div class="popular-tv mx-auto px-5 py-5">
        <h1 class="text-white text-4xl font-light">Popular TV Shows</h1>
        <div class="list my-6 flex flex-wrap">
          <div class="m-5" v-for="movie in commonTv" :key="movie.id">
            <movie-list
            :id="movie.id"
            :image="movie.poster_path"
            type="tv"></movie-list>
          </div>
        </div>
      </div>
    </section>
  </main-content>
</template>

<script setup>
// import { movies } from "@/state/helpers";
import MovieList from "@/layout/layoutSlider/MovieList.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore()
const commonMovies = ref([])
const commonTv = ref([])
const loading = ref(true)
const initial = async () => {
  await store.dispatch('movies/movies/getPopularMovies')
  await store.dispatch('movies/movies/getPopularTvShows')
  await store.dispatch('auth/auth/getCurrentUser')
  commonMovies.value = store.state.movies.movies.popularMovies
  commonTv.value = store.state.movies.movies.popularTvShows
}
onMounted(() => {
  Promise.all([initial()]).then(() => {
    loading.value = false
  })
})
</script>

<style scoped>
.popular-movie, .popular-tv {
  max-width: 1800px;
}

.m-5 {
  width: 250px;
}
</style>
