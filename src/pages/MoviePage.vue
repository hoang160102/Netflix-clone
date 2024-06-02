<template>
  <main-content>
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
        v-for="movie in bannerMoviePage"
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
    <div class="genre-movie"></div>
    <div class="slider-genre" v-for="kind in genres" :key="kind.id">
      <h1>{{ kind.name }}</h1>
    </div>
  </main-content>
</template>

<script>
import { movies } from "@/state/helpers";
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import SlideMovie from "@/layout/slider/SlideMovie.vue";
export default {
  data() {
    return {
      allGenres: [],
      allFilms: [],
      genreFilms: [],
    };
  },
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
    // async filterMovie() {
    //   const getFilms = await this.allGenres.filter((genre) => {
    //     return 
    //   });
    // },
    async initial() {
      await this.getBannerMoviePage();
      await this.getAllGerne();
      await this.getAllMovies();
      this.genres = this.allGenres;
      this.allMovies = this.allFilms;
    },
  },
  async created() {
    await this.initial();
  },
};
</script>
