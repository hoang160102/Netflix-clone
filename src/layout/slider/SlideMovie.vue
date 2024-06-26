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
        <svg-icon type="mdi" :path="pathPlay"></svg-icon>
        <span class="ml-2">Play</span>
      </router-link>
      <router-link
        :to="urlLink"
        class="info mr-4 text-white flex items-center justify-center py-2 px-5"
      >
        <svg-icon type="mdi" :path="pathInfo"></svg-icon>
        <span class="ml-2">Info</span>
      </router-link>
      <button
        v-if="!isMovieInList"
        @click="addMovie"
        class="text-white add flex items-center justify-center py-2 px-4"
      >
        <svg-icon type="mdi" :path="pathPlus"></svg-icon>
        <span>My List</span>
      </button>
      <button
        v-else
        @click="removeMovie"
        class="text-white remove flex items-center justify-center py-2 px-4"
      >
        <svg-icon type="mdi" :path="pathMinus"></svg-icon>
        <span>My List</span>
      </button>
      <button
        v-if="!isRatedFilm"
        @click="rating"
        class="text-white flex items-center ml-3 justify-center py-2 px-4"
      >
        <svg-icon type="mdi" :path="pathLike"></svg-icon>
      </button>
      <button
        v-else
        @click="removeRating"
        class="text-white text-cyan-600 flex items-center ml-3 justify-center py-2 px-4"
      >
        <svg-icon type="mdi" :path="pathCancelLike"></svg-icon>
      </button>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import { mdiMinus } from "@mdi/js";
import { movies } from "@/state/helpers";
import { auth } from "@/state/helpers";
import { mdiInformationOutline } from "@mdi/js";
import { mdiVideoOutline } from "@mdi/js";
import { mdiPlay } from "@mdi/js";
import { mdiThumbUp } from "@mdi/js";
import { mdiThumbUpOutline } from "@mdi/js";
export default {
  props: [
    "id",
    "image",
    "title",
    "rate",
    "overview",
    "release",
    "genre",
    "type",
  ],
  components: {
    SvgIcon,
  },
  data() {
    return {
      pathPlus: mdiPlus,
      pathInfo: mdiInformationOutline,
      pathTeaser: mdiVideoOutline,
      pathPlay: mdiPlay,
      pathMinus: mdiMinus,
      pathLike: mdiThumbUpOutline,
      pathCancelLike: mdiThumbUp,
      like: [],
      list: [],
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
    movieRate() {
      return (this.rate * 10).toFixed(2);
    },
    movieRateColor() {
      const percent = this.rate * 10;
      if (percent < 50) return "text-red-600";
      if (percent < 70) return "text-yellow-400";
      return "text-emerald-500";
    },
    releaseDate() {
      return this.release.replace(/-/g, "/");
    },
    getGenre() {
      return this.genre
        .map((id) => {
          const filmGenre = this.genres.find((kind) => kind.id === id);
          return filmGenre ? filmGenre.name : null;
        })
        .filter((name) => name !== null)
        .join(", ");
    },
    isMovieInList() {
      const movie = this.list.some((film) => {
        return this.id === film.id;
      });
      return movie;
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
    async callFilmDetail() {
      if (this.type === "movie") {
        await this.getMovieById(this.id);
      } else {
        await this.getTvShowById(this.id);
      }
    },
    async addMovie() {
      await this.callFilmDetail();
      let newDetail = JSON.parse(JSON.stringify(this.filmDetail));
      newDetail.type = this.type;
      await this.addMovieToList(newDetail);
      await this.inital();
      this.isMovieInList;
    },
    async removeMovie() {
      const movie = await this.list.find((film) => {
        return this.id === film.id;
      });
      await this.removeMovieFromList(movie);
      this.inital();
      this.isMovieInList;
    },
    async rating() {
      await this.rateFilms(this.id);
      this.inital();
      this.isRatedFilm;
    },
    async removeRating() {
      const film = await this.like.find((item) => {
        return item === this.id
      })
      await this.removeRate(film)
      this.inital(),
      this.isRatedFilm
    },  
    async inital() {
      await this.getCurrentUser();
      this.list = this.fullInfoUser.userList;
      this.like = this.fullInfoUser.ratedFilms;
    },
  },
  async created() {
    await this.inital();
  },
};
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
