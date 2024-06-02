<template>
  <main-content>
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
  </main-content>
</template>
<script>
import SliderBanner from "@/layout/slider/SliderBanner.vue";
import MovieSlider from "@/layout/layoutSlider/MovieSlider.vue";
import { auth } from '@/state/helpers';
export default {
  components: {
    SliderBanner,
    MovieSlider,
  },
  computed: {
    ...auth.authComputed,
  },
  methods: {
    ...auth.authMethods,
  },
  async created() {
    await this.getCurrentUser()
  }
};
</script>
<style scoped>
</style>
