<template>
  <div :id="id" class="film mr-10 mb-10 relative">
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
          <div @click="removeMovie" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathMinus"> </svg-icon>
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
import { mdiPlay } from "@mdi/js";
import { mdiMinus } from "@mdi/js";
import { mdiInformationVariant } from "@mdi/js";
import { movies } from "@/state/helpers";
import { auth } from "@/state/helpers";
export default {
  props: ["image", "id", "type"],
  components: {
    SvgIcon,
  },
  data() {
    return {
      pathTeaser: mdiVideoOutline,
      pathPlay: mdiPlay,
      pathInfo: mdiInformationVariant,
      pathMinus: mdiMinus,
    };
  },
  computed: {
    ...movies.moviesComputed,
    ...auth.authComputed,
  },
  methods: {
    ...movies.moviesMethods,
    ...auth.authMethods,
    async removeMovie() {
      const element = document.getElementById(this.id);
      element.remove();
      const movie = this.list.find((film) => {
        return this.id === film.id
      })
      this.removeMovieFromList(movie)
    },
  },
  async created() {
    await this.getCurrentUser();
    this.list = this.fullInfoUser.userList;
  },
};
</script>

<style scoped>
.film {
  max-height: 300px;
  max-width: 250px;
  transition: all 0.5s ease;
}

img {
  border-radius: 10px;
  max-height: 300px;
}

.film:hover {
  scale: 1.2;
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
</style>
