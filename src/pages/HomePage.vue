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
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    SliderBanner,
    MovieSlider,
  },
  setup() {
    const store = useStore();

    const loading = ref(true);

    // const authComputed = auth.authComputed;
    // const moviesComputed = movies.moviesComputed;

    const getCurrentUser = () => store.dispatch("auth/auth/getCurrentUser");
    const getAllMovies = () => store.dispatch("movies/movies/getAllMovies");

    onMounted(() => {
      // Simulate an API call to get the user and movies
      Promise.all([getCurrentUser(), getAllMovies()]).then(() => {
        loading.value = false;
      });
    });
    return { loading }
  }
};
</script>
<style scoped></style>
