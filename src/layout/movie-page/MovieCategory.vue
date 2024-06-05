<template>
  <div v-if="!!showGenre" class="wrapper mt-7 p-7">
    <div class="genre my-6 text-3xl font-semibold text-white">
      {{ name }}
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
        <movie-list
          :id="movie.id"
          :image="movie.poster_path"
          type="movie"
        ></movie-list>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// import { movies } from "@/state/helpers";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MovieList from "../layoutSlider/MovieList.vue";
export default {
  data() {
    return {
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
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  props: ["id", "name", "movies"],
  components: {
    Swiper,
    SwiperSlide,
    MovieList,
  },
  computed: {
    showGenre() {
      return this.movies.length >= 3;
    },
  },
};
</script>
