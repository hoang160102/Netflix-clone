<template>
  <main-content>
    <banner-television
      :detail="detail"
      :id="detail.id"
      :image="detail.backdrop_path"
      :title="detail.name"
      :rate="detail.vote_average"
      :release="detail.first_air_date"
      :overview="detail.overview"
      :genre="detail.genres"
      :seasons="detail.number_of_seasons"
      type="movie"
    ></banner-television>
    <div class="cast mt-5 p-10">
      <div class="title font-semibold text-5xl mb-5 text-center text-white">
        Actors
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
        <swiper-slide v-for="actor in actors" :key="actor.id">
          <television-actors
            :id="actor.id"
            :profile="actor.profile_path"
            :name="actor.name"
            :cast-name="actor.character"
          ></television-actors>
        </swiper-slide>
      </swiper>
    </div>
    <div class="trailer mt-5 p-10">
      <div class="title font-semibold text-5xl mb-5 text-center text-white">
        Trailer
      </div>
      <div
        v-if="!!videoLink"
        class="video flex flex-wrap justify-center mx-auto"
      >
        <television-trailer
          v-for="vid in videoLink"
          :key="vid.id"
          :id="vid.id"
          :video-key="vid.key"
        ></television-trailer>
      </div>
    </div>
  </main-content>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { movies } from "@/state/helpers";
import BannerTelevision from "./banner-tv/BannerTelevision.vue";
import TelevisionActors from "./actors/TelevisionActors.vue";
import TelevisionTrailer from "./tv-trailer/TelevisionTrailer.vue";
export default {
  components: {
    BannerTelevision,
    Swiper,
    SwiperSlide,
    TelevisionActors,
    TelevisionTrailer,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  data() {
    return {
      detail: [],
      videoLink: [],
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
      await this.getTvShowById(this.$route.params.tvshowId);
      await this.getTvActors(this.$route.params.tvshowId);
      await this.getTvVideo(this.$route.params.tvshowId);
      this.detail = this.filmDetail;
      this.videoLink = this.video;
    },
  },
  async created() {
    await this.initial();
  },
};
</script>
