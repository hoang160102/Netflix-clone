<template>
  <main-content>
    <div class="loading pt-10 flex justify-center" v-if="loading">
      <v-progress-circular color="red" indeterminate></v-progress-circular>
    </div>
    <section v-else>
      <slider-banner></slider-banner>
      <div class="slide-movie">
        <movie-slider
          class="mx-5"
          category-title="Trending Movies"
          request-url="/trending/movie/week"
          media-type="movie"
        ></movie-slider>
        <movie-slider
          class="mx-5"
          category-title="Trending TV Shows"
          request-url="/trending/tv/week"
          media-type="tv"
        ></movie-slider>
        <movie-slider
          class="mx-5"
          category-title="Recently Added Movies"
          request-url="/movie/now_playing"
          media-type="movie"
        ></movie-slider>
        <movie-slider
          class="mx-5"
          category-title="Airing TV Shows"
          request-url="/tv/airing_today"
          media-type="tv"
        ></movie-slider>
        <movie-slider
          class="mx-5"
          category-title="Top Rated Movies"
          request-url="/movie/top_rated"
          media-type="movie"
        ></movie-slider>
        <movie-slider
          class="mx-5"
          category-title="Top Rated TV Shows"
          request-url="/tv/top_rated"
          media-type="tv"
        ></movie-slider>
      </div>
    </section>
  </main-content>
</template>
<script>
import SliderBanner from "@/layout/slider/SliderBanner.vue";
import MovieSlider from "@/layout/layoutSlider/MovieSlider.vue";
import { auth } from "@/state/helpers";
import { movies } from "@/state/helpers";
export default {
  components: {
    SliderBanner,
    MovieSlider,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...auth.authComputed,
    ...movies.moviesComputed,
  },
  methods: {
    ...auth.authMethods,
    ...movies.moviesMethods,
    async initial() {
      this.loading = true;
      await this.getCurrentUser();
      await this.getAllMovies();
      this.loading = false;
    },
  },
  async created() {
    await this.initial();
  },
};
</script>
<style scoped></style>
