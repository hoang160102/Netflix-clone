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
      <div class="other mx-auto p-3 mt-3">
        <div class="title text-4xl text-white p-3">Other TV Shows</div>
        <div class="film-box flex flex-wrap">
          <div class="film m-6" v-for="film in tvShows" :key="film.id">
            <movie-list :id="film.id" :image="film.poster_path" type="tv"></movie-list>
          </div>
        </div>
      </div>
    </section>
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
import { auth } from "@/state/helpers";
import SlideMovie from "@/layout/slider/SlideMovie.vue";
import MovieList from "@/layout/layoutSlider/MovieList.vue";
export default {
  data() {
    return {
      tvShows: [],
      topTvShows: [],
      loading: false,
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
    ...auth.authComputed,
  },
  methods: {
    ...auth.authMethods,
    ...movies.moviesMethods,
    async initial() {
      this.loading = true;
      await this.getTvShows();
      await this.getBannerTvShow();
      await this.getGenreTvShows();
      await this.getCurrentUser()
      this.tvShows = this.allTvShows;
      this.topTvShows = this.bannerTvShowPage;
      this.loading = false;
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
