<template>
  <main-content>
    <div class="loading pt-10 flex justify-center" v-if="loading">
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </div>
    <section v-else>
      <swiper
        :centeredSlides="true"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="mySwiper-banner w-full"
      >
        <swiper-slide
          class="relative"
          v-for="movie in bannerMovie"
          :key="movie.id"
        >
          <slide-movie
            :id="movie.id"
            :image="movie.backdrop_path"
            :title="movie.title"
            :rate="movie.vote_average"
            :overview="movie.overview"
            :release="movie.release_date"
            :genre="movie.genre_ids"
            type="movie"
          ></slide-movie>
        </swiper-slide>
      </swiper>
      <div class="display px-3">
        <movie-category
          v-for="item in listFilms"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :movies="item.movies"
        ></movie-category>
      </div>
    </section>
  </main-content>
</template>

<script setup>
// import { movies } from "@/state/helpers";
import { Swiper } from "swiper/vue";
import { SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import SlideMovie from "@/layout/slider/SlideMovie.vue";
import MovieCategory from "../layout/movie-page/MovieCategory.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore()
const allGenres = ref([]);
const allFilms = ref([]);
const listFilms = ref([]);
const bannerMovie = ref([])
const loading = ref(true);
const modules = [Autoplay, Pagination]
const filterMovie = async () => {
  const result = allGenres.value.map((el) => {
    return {
      ...el,
      movies: allFilms.value.filter((film) => {
        return film.genre_ids.includes(el.id);
      }),
    };
  });
  listFilms.value = result;
};
const initial = async () => {
  await store.dispatch('movies/movies/getBannerMoviePage')
  await store.dispatch('movies/movies/getAllGenre')
  await store.dispatch(('movies/movies/getAllMovies'))
  await store.dispatch('auth/auth/getCurrentUser')
  allGenres.value = store.state.movies.movies.genres
  allFilms.value = store.state.movies.movies.allMovies
  bannerMovie.value = store.state.movies.movies.bannerMoviePage
  filterMovie()
}
onMounted(() => {
  Promise.all([initial()]).then(() => {
    loading.value = false
  })
})
</script>
