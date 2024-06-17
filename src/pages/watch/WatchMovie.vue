<template>
  <main-content>
    <div class="loading pt-10 flex justify-center" v-if="loading">
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </div>
    <section v-else>
      <div class="watch-movie w-screen pr-4 h-screen">
        <iframe
          :src="`https://player.smashy.stream/movie/${getId}`"
          frameborder="0"
          scrolling="no"
          allowfullscreen
        ></iframe>
      </div>
      <div v-if="recommend" class="recommendation mt-7 p-10">
          <div class="title my-6 text-3xl font-semibold text-white">Recommendation</div>
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
          <swiper-slide
            class="relative"
            v-for="movie in recommend"
            :key="movie.id"
          >
            <movie-list
              :id="movie.id"
              :image="movie.poster_path"
              type="movie"
            ></movie-list>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </main-content>
</template>

<script>
import { movies } from "@/state/helpers";
import { Swiper, SwiperSlide } from "swiper/vue";
import MovieList from '../../layout/layoutSlider/MovieList.vue'
// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
export default {
  data() {
    return {
      recommend: null,
      loading: false,
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
  components: {
    Swiper,
    SwiperSlide,
    MovieList
  },
  computed: {
    ...movies.moviesComputed,
    getId() {
      return this.$route.params.movieId;
    },
  },
  methods: {
    ...movies.moviesMethods,
    async initial() {
      this.loading = true;
      await this.getMovieRecommendations(this.$route.params.movieId);
      this.recommend = this.recommendations;
      this.loading = false;
    },
  },
  async created() {
    await this.initial();
  },
};
</script>

<style scoped>
.watch-movie {
  max-height: 90vh;
}
iframe {
  width: 100%;
  height: 100%;
}
</style>
