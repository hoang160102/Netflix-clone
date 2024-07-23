<template>
  <div class="wrapper mt-7 p-7">
    <div class="movie-title my-6 text-3xl font-semibold text-white">
      {{ categoryTitle }}
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
      <swiper-slide class="flex" v-for="(movie) in movies" :key="movie.id">
        <movie-list :id="movie.id" :image="movie.poster_path" :type="type"></movie-list>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import MovieList from "./MovieList.vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default {
  props: {
    categoryTitle: {
      type: String,
      required: true,
    },
    requestUrl: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    MovieList,
  },
  setup(props) {
    const store = useStore();
    const movies = ref([]);
    const modules = [Navigation, Pagination, Scrollbar, A11y];
    const swiperOptions = {
      breakpoints: {
        700: {
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
    };

    const type = computed(() => props.mediaType);

    const getMovieSlide = async (url) => {
      await store.dispatch("movies/movies/getMovieSlide", url);
      movies.value = store.state.movies.movies.movieSlide;
    };
    getMovieSlide(props.requestUrl)
    return {
      movies,
      modules,
      swiperOptions,
      type,
      getMovieSlide,
    };
  },
};
</script>

<style scoped>
/* .swiper {
  z-index: 0 !important;
} */
</style>
