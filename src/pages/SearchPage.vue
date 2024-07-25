<template>
  <main-content>
    <div class="loading pt-10 flex justify-center" v-if="loading">
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </div>
    <div v-else class="search mx-auto px-5 py-5">
      <h1 class="text-white text-4xl font-light">Search</h1>
      <div v-if="searchedFilm && searchedFilm.length > 2" class="list my-6 flex flex-wrap">
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

<script setup>
import MovieList from "@/layout/layoutSlider/MovieList.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const store = useStore()
const route = useRoute()
const searchedFilm = ref(null)
const loading = ref(true)
const initial = async () => {
  await store.dispatch('movies/movies/searchFilm', route.params.search)
  searchedFilm.value = store.state.movies.movies.filmSearching
}
onMounted(() => {
  Promise.all([initial()]).then(() => {
    loading.value = false
  })
})
</script>

<style scoped>
.m-5 {
  width: 250px;
}
.search {
  max-width: 1800px;
}
</style>
