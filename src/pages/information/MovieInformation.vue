<template>
  <main-content>
    <banner-movie
      :detail="detail"
      :id="detail.id"
      :image="detail.backdrop_path"
      :title="detail.title"
      :rate="detail.vote_average"
      :overview="detail.overview"
      :release="detail.release_date"
      :genre="detail.genres"
      type="movie"
    ></banner-movie>
    <div class="cast mt-5 p-10">
      <div class="title font-semibold text-5xl mb-5 text-center text-white">Actors</div>
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
        <swiper-slide v-for="actor in actors" :key="actor.id">
          <list-actors
            :id="actor.id"
            :profile="actor.profile_path"
            :name="actor.name"
            :cast-name="actor.character"
          ></list-actors>
        </swiper-slide>
      </swiper>
    </div>
    <div class="trailer mt-5 p-10">
      <div class="title font-semibold text-5xl mb-5 text-center text-white">Trailer</div>
    </div>
  </main-content>
</template>

<script>
import { movies } from "@/state/helpers";
import BannerMovie from "./banner/BannerMovie.vue";
import ListActors from "./actors/ListActors.vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default {
  components: {
    BannerMovie,
    ListActors,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  data() {
    return {
      detail: [],
      swiperOptions: {
        breakpoints: {
          500: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          800: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          1000: {
            slidesPerView: 4,
            slidesPerGroup: 3,
          },
          1300: {
            slidesPerView: 5,
            slidesPerGroup: 4,
          },
          1600: {
            slidesPerView: 6,
            slidesPerGroup: 5,
          },
        },
      },
    };
  },
  computed: {
    ...movies.moviesComputed,
  },
  methods: {
    ...movies.moviesMethods,
    async initial() {
      await this.getMovieById(this.$route.params.movieId);
      await this.getActors(this.$route.params.movieId);
      this.detail = this.filmDetail;
    },
  },
  async created() {
    await this.initial();
  },
};
</script>

<style scoped>
</style>
