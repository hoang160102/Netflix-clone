import { mapState, mapActions } from "vuex";
export const moviesComputed = {
    ...mapState('movies/movies', ['movieList', 'movieBanner', 'genres', 'movieSlide'])
}
export const moviesMethods = {
    ...mapActions('movies/movies', ['getBannerMovies', 'getAllGerne', 'getMovieSlide'])
}