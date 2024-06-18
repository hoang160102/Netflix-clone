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
          <router-link :to="urlLink" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathInfo"> </svg-icon>
          </router-link>
          <span>Info</span>
        </div>
        <div class="function mb-3 text-white flex items-center">
          <router-link :to="watchFilm" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathPlay"></svg-icon>
          </router-link>
          <span>Play</span>
        </div>
        <div class="function mb-3 text-white flex items-center">
          <div @click="removeMovie" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathMinus"> </svg-icon>
          </div>
          <span>My List</span>
        </div>
        <div
          class="function mb-3 text-white flex items-center"
          v-if="!isRatedFilm"
        >
          <div @click="rating" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathLike"> </svg-icon>
          </div>
          <span>Rate</span>
        </div>
        <div v-else class="function mb-3 text-white flex items-center">
          <div @click="removeRating" class="circle p-2 mr-3">
            <svg-icon type="mdi" :path="pathLike"> </svg-icon>
          </div>
          <span>Unrate</span>
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
import { mdiThumbUp } from "@mdi/js";
import { mdiThumbUpOutline } from "@mdi/js";
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
      pathLike: mdiThumbUpOutline,
      pathCancelLike: mdiThumbUp,
      like: [],
    };
  },
  computed: {
    ...movies.moviesComputed,
    ...auth.authComputed,
    urlLink() {
      if (this.type === "movie") {
        return { name: "MovieDetail", params: { movieId: this.id } };
      } else {
        return { name: "TvShowDetail", params: { tvshowId: this.id } };
      }
    },
    watchFilm() {
      if (this.type === "tv") {
        return {
          name: "Play TV Show",
          params: { tvId: this.id },
          query: { season: 1, ep: 1 },
        };
      } else {
        return {
          name: "Play Movie",
          params: { movieId: this.id },
        };
      }
    },
    isRatedFilm() {
      const film = this.like.some((item) => {
        return item === this.id;
      });
      return film;
    },
  },
  methods: {
    ...movies.moviesMethods,
    ...auth.authMethods,
    async removeMovie() {
      const movie = this.list.find((film) => {
        return this.id === film.id;
      });
      await this.removeMovieFromList(movie);
      const element = document.getElementById(this.id);
      element.remove();
    },
    async rating() {
      await this.rateFilms(this.id);
      this.initial();
      this.isRatedFilm;
    },
    async removeRating() {
      const film = await this.like.find((item) => {
        return item === this.id
      })
      await this.removeRate(film)
      this.initial(),
      this.isRatedFilm
    },
    async initial() {
      await this.getCurrentUser();
      this.list = this.fullInfoUser.userList;
      this.like = this.fullInfoUser.ratedFilms;
    },
  },
  async created() {
    await this.initial()
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
