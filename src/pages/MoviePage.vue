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
    <div class="display px-3">
      <movie-category
        v-for="item in listFilms"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :movies="item.movies"
      ></movie-category>
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
import MovieCategory from "../layout/movie-page/MovieCategory.vue"
export default {
  data() {
    return {
      allGenres: [],
      allFilms: [],
      genreFilms: [],
      listFilms: []
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    SlideMovie,
    MovieCategory
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
    async filterMovie() {
      const result = this.allGenres.map((el) => {
        return {
          ...el,
          movies: this.allFilms.filter((film) => {
            return film.genre_ids.includes(el.id)
          })
        }
      })
      console.log(result)
      this.listFilms =  result
    },
    async initial() {
      await this.getBannerMoviePage();
      await this.getAllGerne();
      await this.getAllMovies();
      this.allGenres = this.genres;
      this.allFilms = this.allMovies;
      this.filterMovie()
    },
  },
  async created() {
    await this.initial();
  },
};
</script>
