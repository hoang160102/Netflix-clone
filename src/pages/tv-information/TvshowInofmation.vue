<template>
  <main-content>
    <div class="loading pt-10 flex justify-center" v-if="loading">
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </div>
    <section v-else>
      <slide-movie
        :id="detail.id"
        :image="detail.backdrop_path"
        :title="detail.name"
        :rate="detail.vote_average"
        :release="detail.first_air_date"
        :overview="detail.overview"
        :genre="detail.genres"
        :seasons="detail.number_of_seasons"
        type="tv"
      ></slide-movie>
      <div class="trailer mt-5 p-10">
        <div class="title font-semibold text-5xl mb-5 text-center text-white">
          Trailer
        </div>
        <div
          v-if="videoLink.length > 0"
          class="video flex flex-wrap justify-center mx-auto"
        >
          <movie-trailer
            v-for="vid in videoLink"
            :key="vid.id"
            :id="vid.id"
            :video-key="vid.key"
          ></movie-trailer>
        </div>
        <div class="text-center text-slate-400" v-else>This film does not have any trailers</div>
      </div>
      <div class="season mt-5 p-10">
          <select class="mb-5 bg-white" v-model="selected" @change="fetchEpisodes">
            <option disabled value="">Choose season</option>
            <option
              v-for="(item, index) in detail.number_of_seasons"
              :key="index"
              :value="index + 1"
            >
              Season {{ index + 1 }}
            </option>
          </select>
        <div class="list-ep">
          <swiper
          :modules="modules"
          :slides-per-view="6"
          :space-between="50"
          navigation
          :pagination="{ clickable: true }"
          :scrollbar="{ draggable: true }"
          :breakpoints="swiperOptions.breakpointsEp"
          class="mySwiper-slide swiper-ep"
        >
          <swiper-slide v-for="ep in listEpisodes" :key="ep.id">
            <television-episodes
              :series-id="getSeriesId"
              :id="ep.id"
              :image="ep.still_path"
              :num="ep.episode_number"
              :name="ep.name"
              :overview="ep.overview"
              :season="selected"
              :backdrop="detail.backdrop_path"
            ></television-episodes>
          </swiper-slide>
        </swiper>
        </div>
      </div>
      <div class="cast mt-5 p-10">
        <div class="title font-semibold text-5xl mb-5 text-center text-white">
          Actors
        </div>
        <swiper
          v-if="actors.length > 0"
          :modules="modules"
          :slides-per-view="6"
          :space-between="50"
          navigation
          :pagination="{ clickable: true }"
          :scrollbar="{ draggable: true }"
          :breakpoints="swiperOptions.breakpointsActor"
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
        <div class="text-center text-slate-400" v-else>This film does not have data of actors</div>
      </div>
    </section>
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
import { auth } from "@/state/helpers";
import SlideMovie from "@/layout/slider/SlideMovie.vue";
import ListActors from "../information/actors/ListActors.vue";
import MovieTrailer from "../information/trailer/MovieTrailer.vue";
import TelevisionEpisodes from "./episodes/TelevisionEpisodes.vue"
export default {
  components: {
    Swiper,
    SwiperSlide,
    ListActors,
    MovieTrailer,
    SlideMovie,
    TelevisionEpisodes
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  data() {
    return {
      loading: false,
      detail: [],
      videoLink: [],
      listEpisodes: null,
      selected: "",
      swiperOptions: {
        breakpointsActor: {
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
        breakpointsEp: {
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
            slidesPerView: 5,
            slidesPerGroup: 4,
          },
        },
      },
    };
  },
  computed: {
    ...movies.moviesComputed,
    ...auth.authComputed,
    getSeriesId() {
      return this.$route.params.tvshowId
    },
  },
  methods: {
    ...movies.moviesMethods,
    ...auth.authMethods,
    async fetchEpisodes() {
      await this.getEpisodes({
        id: this.$route.params.tvshowId,
        ss: this.selected
      })
      this.listEpisodes = this.episodes
    },
    async initial() {
      this.loading = true;
      await this.getTvShowById(this.$route.params.tvshowId);
      await this.getTvActors(this.$route.params.tvshowId);
      await this.getTvVideo(this.$route.params.tvshowId);
      await this.getCurrentUser()
      this.detail = this.filmDetail;
      this.videoLink = this.video;
      this.loading = false;
    },
  },
  async created() {
    await this.initial();
  },
};
</script>

<style scoped>
select {
  padding: 10px;
  border-radius: 10px;
  border: none;
  outline: none;
}

select:hover {
  cursor: pointer;
}

option:hover {
  cursor: pointer;
}
</style>
