import axios from "axios";

const API_KEY = "?api_key=716fe319d36f1baebdeb59c8e3156dc5";
export const state = {
  movieList: [],
  movieBanner: [],
  genres: [],
  movieSlide: null
};

export const mutations = {
  //   fetchMovieList(state, data) {
  //     state.movieList = data;
  //     console.log(state.movieList)
  //   },
  fetchMovieBanner(state, data) {
    state.movieBanner = data;
  },
  fetchGenres(state, data) {
    state.genres = data
  },
  fetchMovieSlide(state, data) {
    state.movieSlide = data
  }
};

export const actions = {
  async getBannerMovies({ commit }) {
    const result = await axios.get(
      "https://api.themoviedb.org/3/discover/movie" + API_KEY
    );
    const data = result.data.results.splice(0, 10);
    commit("fetchMovieBanner", data);
  },
  async getAllGerne( { commit }) {
    const result = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list" + API_KEY
    );
    commit("fetchGenres", result.data.genres);
  },
  async getMovieSlide({commit}, url) {
    const result = await axios.get(`https://api.themoviedb.org/3${url}${API_KEY}`)
    commit('fetchMovieSlide', result.data.results)
  }
};
