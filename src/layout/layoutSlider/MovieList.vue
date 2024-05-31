<template>
  <div class="film relative">
    <div class="film-box absolute left-0 top-0">
      <img
        class="w-full"
        :src="`https://image.tmdb.org/t/p/original${image}`"
        alt=""
      />
    </div>
    <div class="cover left-0 top-0 absolute">
      <div class="video-func absolute left-1/2 top-1/2">
        <div class="function w-full mb-3 text-white flex items-center">
          <div class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathInfo"> </svg-icon>
          </div>
          <span>Info</span>
        </div>
        <div class="function mb-3 text-white flex items-center">
          <div class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathTeaser"> </svg-icon>
          </div>
          <span>Teaser</span>
        </div>
        <div class="function mb-3 text-white flex items-center">
          <div class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathPlay"></svg-icon>
          </div>
          <span>Play</span>
        </div>
        <div class="function mb-3 text-white flex items-center">
          <div @click="addMovie" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathPlus"> </svg-icon>
          </div>
          <span>My List</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiVideoOutline } from "@mdi/js";
import { mdiPlay } from '@mdi/js';
import { mdiPlus } from "@mdi/js";
import { mdiInformationVariant } from '@mdi/js';
import { movies } from "@/state/helpers";
export default {
  props: ['image', 'id'],
  components: {
    SvgIcon,
  },
  data() {
    return {
      pathTeaser: mdiVideoOutline,
      pathPlay: mdiPlay,
      pathPlus: mdiPlus,
      pathInfo: mdiInformationVariant
    };
  },
  computed: {
    ...movies.moviesComputed
  },
  methods: {
    ...movies.moviesMethods,
    addMovie() {
      this.addMovieToList(this.id)
    }
  }
};
</script>

<style scoped>
.film {
  height: 300px;
  transition: all 0.5s ease;
}

.film-box {
  max-height: 300px;
  border-radius: 10px;
}

img {
  max-height: 300px;
  border-radius: 10px;
}

.film:hover {
  scale: 1.2;
}

.cover {
  background: rgba(0, 0, 0, 0.7);
  height: 300px;
  width: 100%;
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
