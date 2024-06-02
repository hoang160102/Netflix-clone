import { mapState, mapActions } from "vuex";
export const moviesComputed = {
  ...mapState("movies/movies", [
    "movieList",
    "movieBanner",
    "genres",
    "movieSlide",
    "filmDetail",
    "bannerMoviePage",
    "allMovies"
  ]),
};
export const moviesMethods = {
  ...mapActions("movies/movies", [
    "getBannerMovies",
    "getAllGerne",
    "getAllMovies",
    "getMovieSlide",
    "addMovieToList",
    "removeMovieFromList",
    "getMovieById",
    "getTvShowById",
    "getBannerMoviePage",
  ]),
};
