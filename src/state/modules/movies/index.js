import { mapState, mapActions } from "vuex";
export const moviesComputed = {
  ...mapState("movies/movies", [
    "movieList",
    "movieBanner",
    "genres",
    "movieSlide",
    "filmDetail",
    "bannerMoviePage",
    "allMovies",
    "popularMovies",
    "popularTvShows",
    "tvGenre",
    "allTvShows",
    "bannerTvShowPage",
    "actors",
    "video",
    "episodes",
    "recommendations"
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
    "getPopularMovies",
    "getPopularTvShows",
    "getTvShows",
    "getGenreTvShows",
    "getBannerTvShow",
    "getActors",
    "getTvActors",
    "getVideo",
    "getTvVideo",
    // "addMovieRating",
    // "addTvShowRating"
    "getEpisodes",
    "getMovieRecommendations"
  ]),
};
