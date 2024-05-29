<template>
  <div class="w-full movie-img">
    <img :src="`https://image.tmdb.org/t/p/original${image}`" alt="" />
    <div class="left-back"></div>
    <div class="movie-wrapper"></div>
  </div>
  <div class="info-movie">
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
      {{ desc }}
    </div>
    <div class="genres text-gray-400 my-4">
      Genres: <span class="text-white">{{ getGenre }}</span>
    </div>
    <button class="text-white flex align-center justify-center py-2 px-5">
      <svg-icon type="mdi" :path="path"></svg-icon>
      <span class="ml-2">My List</span>
    </button>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import { movies } from "@/state/helpers";
export default {
  props: ["id", "image", "title", "rate", "desc", "release", "genre"],
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiPlus,
    };
  },
  computed: {
    ...movies.moviesComputed,
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
          const filmGenre = this.genres.find((type) => type.id === id);
          return filmGenre ? filmGenre.name : null;
        })
        .filter((name) => name !== null)
        .join(", ");
    },
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
  height: 100%;
  width: 50%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(90deg, #000 50%, transparent);
  display: block;
}

.movie-wrapper {
  height: 80vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.5);
  display: none;
}

.info-movie {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
}

button {
  border: 1px solid #fff;
  border-radius: 5px;
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
