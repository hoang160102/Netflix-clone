<template>
  <main-content>
    <slider-banner></slider-banner>
    <movie-slider category-title="Trending Movies" request-url="/trending/all/week"></movie-slider>
    <movie-slider category-title="Trending TV Shows" request-url="/trending/tv/week"></movie-slider>
    <movie-slider category-title="Recently Added Movies" request-url="/movie/now_playing"></movie-slider>
    <movie-slider category-title="Airing TV Shows" request-url="/tv/airing_today"></movie-slider>
    <movie-slider category-title="Top Rated Movies" request-url="/movie/top_rated"></movie-slider>
    <movie-slider category-title="Top Rated TV Shows" request-url="/tv/top_rated"></movie-slider>
  </main-content>
</template>
<script>
import SliderBanner from '@/layout/slider/SliderBanner.vue';
import MovieSlider from '@/layout/layoutSlider/MovieSlider.vue';
export default {
  components: {
    SliderBanner,
    MovieSlider
  },
};
</script>

