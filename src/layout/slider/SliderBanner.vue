<template>
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
    <swiper-slide class="relative" v-for="movie in movieBanner" :key="movie.id">
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
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { movies } from "@/state/helpers";
import SlideMovie from "./SlideMovie.vue";
export default {
  components: {
    Swiper,
    SwiperSlide,
    SlideMovie,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination],
    };
  },
  computed: {
    ...movies.moviesComputed,
  },
  methods: {
    ...movies.moviesMethods,
  },
  async created() {
    await this.getBannerMovies();
    this.getAllGerne()
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 80vh;
}

.swiper-slide {
  font-size: 18px;
  width: 100%;
  height: 100%;
}
</style>
