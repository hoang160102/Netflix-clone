import { mapState, mapActions } from "vuex";
export const moviesComputed = {
    ...mapState('movies/movies', ['movieList', 'movieBanner', 'genres', 'movieSlide', 'userMovie'])
}
export const moviesMethods = {
    ...mapActions('movies/movies', ['getBannerMovies', 'getAllGerne', 'getMovieSlide', 'addMovieToList', 'getMovieById'])
}