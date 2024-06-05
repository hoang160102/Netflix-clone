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
      <swiper-slide class="relative" v-for="film in topTvShows" :key="film.id">
        <slide-movie
          :id="film.id"
          :image="film.backdrop_path"
          :title="film.name"
          :rate="film.vote_average"
          :overview="film.overview"
          :release="film.first_air_date"
          :genre="film.genre_ids"
          type="tv"
        ></slide-movie>
      </swiper-slide>
    </swiper>
    <div class="other mx-auto p-3 my-3">
      <div class="title text-4xl text-white p-3">Other TV Shows</div>
      <div class="film-box flex flex-wrap">
        <div class="film m-6" v-for="film in tvShows" :key="film.id">
          <movie-list :id="film.id" :image="film.poster_path"></movie-list>
        </div>
      </div>
    </div>
  </main-content>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { movies } from "@/state/helpers";
import SlideMovie from "@/layout/slider/SlideMovie.vue";
import MovieList from "@/layout/layoutSlider/MovieList.vue";
export default {
  data() {
    return {
      genres: [],
      tvShows: [],
      topTvShows: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    SlideMovie,
    MovieList,
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
    async initial() {
      await this.getTvShows();
      await this.getBannerTvShow();
      await this.getGenreTvShows();
      this.tvShows = this.allTvShows;
      this.topTvShows = this.bannerTvShowPage;
    },
  },
  async created() {
    await this.initial();
  },
};
</script>

<style scoped>
  .other {
    max-width: 1700px;
  }
  .film {
    width: 230px;
    height: 320px;
  }
</style>
