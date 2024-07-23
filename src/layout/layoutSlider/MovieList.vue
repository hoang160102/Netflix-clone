<template>
  <div class="film relative">
    <div class="film-box">
      <img
        class="w-full"
        :src="`https://image.tmdb.org/t/p/original${image}`"
        alt=""
      />
    </div>
    <div class="cover left-0 top-0 absolute">
      <div class="video-func absolute left-1/2 top-1/2">
        <div class="function w-full mb-3 text-white flex items-center">
          <router-link :to="urlLink" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="mdiInformationVariant"></svg-icon>
          </router-link>
          <span>Info</span>
        </div>
        <div class="function mb-3 text-white flex items-center">
          <router-link :to="watchFilm" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="mdiPlay"></svg-icon>
          </router-link>
          <span>Play</span>
        </div>
        <div
          v-if="!isMovieInList"
          class="function mb-3 text-white flex items-center"
        >
          <div @click="addMovie" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="mdiPlus"> </svg-icon>
          </div>
          <span>My List</span>
        </div>
        <div v-else class="function mb-3 text-white flex items-center">
          <div @click="removeMovie" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="mdiMinus"> </svg-icon>
          </div>
          <span>My List</span>
        </div>
        <div
          class="function mb-3 text-white flex items-center"
          v-if="!isRatedFilm"
        >
          <div @click="rating" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="mdiThumbUpOutline"> </svg-icon>
          </div>
          <span>Rate</span>
        </div>
        <div v-else class="function mb-3 text-white flex items-center">
          <div @click="removeRating" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="mdiThumbUp"> </svg-icon>
          </div>
          <span>Unrate</span>
        </div>
      </div>
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
import { defineProps, ref } from "vue";
import useAddFilms from "@/composables/useFilmActions";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  image: String,
  id: Number,
  type: String,
});
const list = ref([...store.state.auth.auth.fullInfoUser.userList]);
const like = ref([...store.state.auth.auth.fullInfoUser.ratedFilms]);
const { isMovieInList,
    isRatedFilm,
    urlLink,
    watchFilm,
    addMovie,
    removeMovie,
    rating,
    removeRating } = useAddFilms(list, like, props.id, props.type)
</script>

<style scoped>
.film {
  transition: all 0.5s ease;
}

img {
  border-radius: 10px;
  height: 100%;
}

.film:hover {
  scale: 1.1;
}

.cover {
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
  border-radius: 10px;
  display: none;
}

.film:hover .cover {
  display: block;
}

.circle {
  border: 2px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
}

.video-func {
  transform: translateX(-50%) translateY(-50%);
}

/* .film:hover > .film-box {
  width: 450px;
  min-height: 500px;
}

.film:hover img {
  min-height: 400px;
  border-radius: 10px 10px 0 0;
} */
</style>
