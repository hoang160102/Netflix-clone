<template>
  <section class="w-screen">
    <div class="w-full relative movie-img">
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
      <div class="genres text-gray-400 my-4">
        Genres: <span class="text-white">{{ getGenre }}</span>
      </div>
      <div class="flex">
        <router-link
          to="/"
          class="info mr-4 text-white flex items-center justify-center py-2 px-5"
        >
          <svg-icon type="mdi" :path="pathPlay"></svg-icon>
          <span class="ml-2">Play</span>
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
      </div>
    </div>
  </section>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import { mdiMinus } from "@mdi/js";
import { movies } from "@/state/helpers";
import { auth } from "@/state/helpers";
import { mdiPlay } from "@mdi/js";
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
    "detail",
  ],
  components: {
    SvgIcon,
  },
  data() {
    return {
      pathPlus: mdiPlus,
      pathPlay: mdiPlay,
      pathMinus: mdiMinus,
      list: [],
      movieGerne: [],
      date: ''
    };
  },
  computed: {
    ...movies.moviesComputed,
    ...auth.authComputed,
    movieRate() {
      return (this.rate * 10).toFixed(2);
    },
    movieRateColor() {
      const percent = this.rate * 10;
      if (percent < 50) return "text-red-600";
      if (percent < 70) return "text-yellow-400";
      return "text-emerald-500";
    },
    getGenre() {
      let genre = this.movieGerne.map((kind) => {
        return kind.name;
      });
      return genre.join(", ")
    },
    isMovieInList() {
      const movie = this.list.some((film) => {
        return this.id === film.id;
      });
      return movie;
    },
    releaseDate() {
      return this.date.replace(/-/g, "/")
    }
  },
  methods: {
    ...movies.moviesMethods,
    ...auth.authMethods,
    async addMovie() {
      let newDetail = JSON.parse(JSON.stringify(this.detail));
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
    async inital() {
      await this.getCurrentUser();
      this.list = this.fullInfoUser.userList;
      this.movieGerne = this.genre
      this.date = this.release
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
  height: 80vh;
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

section {
  height: 80vh;
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
