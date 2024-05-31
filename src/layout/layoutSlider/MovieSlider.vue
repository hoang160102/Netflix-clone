<template>
  <div class="wrapper mt-7 p-7">
    <div class="movie-title my-6 text-3xl font-semibold text-white">
      {{ categoryTitle }}
    </div>
    <swiper
      :modules="modules"
      :slides-per-view="6"
      :space-between="50"
      navigation
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
      :breakpoints="swiperOptions.breakpoints"
      class="mySwiper-slide"
    >
      <swiper-slide v-for="movie in movies" :key="movie.id">
        <movie-list :id="movie.id" :image="movie.poster_path"></movie-list>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { movies } from "@/state/helpers";
import MovieList from "./MovieList.vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
export default {
  props: ["category-title", "request-url"],
  data() {
    return {
      movies: [],
      swiperOptions: {
        breakpoints: {
          500: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          800: {
            slidesPerView: 4,
            slidesPerGroup: 3,
          },
          1100: {
            slidesPerView: 5,
            slidesPerGroup: 4,
          },
          1400: {
            slidesPerView: 6,
            slidesPerGroup: 5,
          },
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    MovieList,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  computed: {
    ...movies.moviesComputed,
  },
  methods: {
    ...movies.moviesMethods,
  },
  async created() {
    await this.getMovieSlide(this.requestUrl);
    this.movies = this.movieSlide;
  },
};
</script>

<style scoped>
/* .swiper {
  z-index: 0 !important;
} */
</style>
