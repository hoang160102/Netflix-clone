<template>
  <div class="w-full movie-img">
    <img :src="`https://image.tmdb.org/t/p/original${image}`" alt="" />
    <div class="left-back h-full w-1/2 absolute top-0 left-0"></div>
    <div class="movie-wrapper w-full absolute left-0 top-0"></div>
  </div>
  <div class="info-movie w-full left-14 top-2/4 absolute">
    <div class="title-movie text-white text-5xl font-bold">
      {{ title }}
    </div>
    <div class="rate-release my-4 flex">
      <div class="rate font-light text-base mr-4" :class="movieRateColor">
        {{ movieRate }}% Match
      </div>
      <div class="release font-light text-base text-white">
        {{ releaseDate }}
      </div>
    </div>
    <div class="movie-detail my-4 w-1/3 text-gray-400 font-light">
      {{ overview }}
    </div>
    <div v-if="getGenre" class="genres text-gray-400 my-4">
      Genres: <span class="text-white">{{ getGenre }}</span>
    </div>
    <div class="flex">
      <router-link
        :to="watchFilm"
        class="info mr-4 text-white flex items-center justify-center py-2 px-5"
      >
        <svg-icon type="mdi" :path="mdiPlay"></svg-icon>
        <span class="ml-2">Play</span>
      </router-link>
      <router-link
        :to="urlLink"
        class="info mr-4 text-white flex items-center justify-center py-2 px-5"
      >
        <svg-icon type="mdi" :path="mdiInformationVariant"></svg-icon>
        <span class="ml-2">Info</span>
      </router-link>
      <button
        v-if="!isMovieInList"
        @click="addMovie"
        class="text-white add flex items-center justify-center py-2 px-4"
      >
        <svg-icon type="mdi" :path="mdiPlus"></svg-icon>
        <span>My List</span>
      </button>
      <button
        v-else
        @click="removeMovie"
        class="text-white remove flex items-center justify-center py-2 px-4"
      >
        <svg-icon type="mdi" :path="mdiMinus"></svg-icon>
        <span>My List</span>
      </button>
      <button
        v-if="!isRatedFilm"
        @click="rating"
        class="text-white flex items-center ml-3 justify-center py-2 px-4"
      >
        <svg-icon type="mdi" :path="mdiThumbUpOutline"></svg-icon>
      </button>
      <button
        v-else
        @click="removeRating"
        class="text-white text-cyan-600 flex items-center ml-3 justify-center py-2 px-4"
      >
        <svg-icon type="mdi" :path="mdiThumbUp"></svg-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay } from "@mdi/js";
import { mdiPlus } from "@mdi/js";
import { mdiMinus } from "@mdi/js";
import { mdiInformationVariant } from "@mdi/js";
import { mdiThumbUp } from "@mdi/js";
import { mdiThumbUpOutline } from "@mdi/js";
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import useAddFilms from "@/composables/useFilmActions";
import infoFilm from "@/composables/useFilmBanner";
const props = defineProps({
  id: Number,
  image: String,
  title: String,
  rate: Number,
  overview: String,
  release: String,
  genre: Array,
  type: String,
});
const store = useStore();
const list = ref([...store.state.auth.auth.fullInfoUser.userList]);
const like = ref([...store.state.auth.auth.fullInfoUser.ratedFilms]);

const {
  isMovieInList,
  isRatedFilm,
  addMovie,
  removeMovie,
  rating,
  removeRating,
  urlLink,
  watchFilm,
} = useAddFilms(list, like, props.id, props.type);

const { movieRate, movieRateColor, releaseDate, getGenre } = infoFilm(
  props.rate,
  props.release,
  props.genre
);
</script>

<style scoped>
img {
  width: 85%;
  height: 80vh;
  float: right;
  object-fit: cover;
}

.left-back {
  background: linear-gradient(90deg, #000 50%, transparent);
  display: block;
}

.movie-wrapper {
  height: 80vh;
  background-color: rgb(0, 0, 0, 0.5);
  display: none;
}

.info-movie {
  transform: translateY(-50%);
}

button {
  border: 1px solid #fff;
  border-radius: 5px;
}

.info {
  background-color: rgba(109, 109, 110, 0.7);
  border-radius: 5px;
}

.info:hover {
  background-color: rgba(109, 109, 110, 0.4);
}

@media screen and (max-width: 1200px) {
  .movie-wrapper {
    display: block;
  }
  .left-back {
    display: none;
  }
  img {
    width: 100%;
  }
}
</style>
