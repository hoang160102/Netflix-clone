import axios from "axios";
import app from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
const auth = getAuth(app)
const db = getFirestore(app);

const API_KEY = "?api_key=716fe319d36f1baebdeb59c8e3156dc5";
export const state = {
  movieList: [],
  movieBanner: [],
  genres: [],
  filmDetail: [],
  bannerMoviePage: [],
  allMovies: [],
  popularMovies: [],
  popularTvShows: [],
  movieSlide: null
};

export const mutations = {
  //   fetchMovieList(state, data) {
  //     state.movieList = data;
  //     console.log(state.movieList)
  //   },
  fetchAllMovies(state, data) {
    state.allMovies = data
  },
  fetchMovieBanner(state, data) {
    state.movieBanner = data;
  },
  fetchGenres(state, data) {
    state.genres = data
  },
  fetchMovieSlide(state, data) {
    state.movieSlide = data
  },
  fetchFilmDetail(state, data) {
    state.filmDetail = data
  },
  fetchBannerMoviePage(state, data) {
    state.bannerMoviePage = data
  },
  fetchPopularMovies(state, data) {
    state.popularMovies = data
  },
  fetchTvShows(state, data) {
    state.popularTvShows = data
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
  async getAllMovies({ commit }) {
    const result = await axios.get(
      "https://api.themoviedb.org/3/discover/movie" + API_KEY
    );
    const data = result.data.results;
    commit("fetchAllMovies", data);
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
  },
  async addMovieToList(_, movie) {
    const userListRef = doc(db, "users", auth.currentUser.uid)
    await updateDoc(userListRef, {
      userList: arrayUnion(movie)
    })
  },
  async removeMovieFromList(_, movie) {
    const userListRef = doc(db, "users", auth.currentUser.uid)
    await updateDoc(userListRef, {
      userList: arrayRemove(movie)
    })
  },
  async getMovieById({commit}, id) {
    const result = await axios.get(`https://api.themoviedb.org/3/movie/${id}${API_KEY}`)
    commit('fetchFilmDetail', result.data)
  },
  async getTvShowById({commit}, id) {
    const result = await axios.get(`https://api.themoviedb.org/3/tv/${id}${API_KEY}`)
    commit('fetchFilmDetail', result.data)
  },
  async getBannerMoviePage({commit}) {
    const result = await axios.get(`https://api.themoviedb.org/3/trending/movie/day${API_KEY}`)
    commit("fetchBannerMoviePage", result.data.results.splice(0, 10))
  },
  async getPopularMovies({commit}) {
    const result = await axios.get(`https://api.themoviedb.org/3/movie/popular${API_KEY}`)
    commit("fetchPopularMovies", result.data.results)
  },
  async getPopularTvShows({commit}) {
    const result = await axios.get(`https://api.themoviedb.org/3/tv/popular${API_KEY}`)
    commit("fetchTvShows", result.data.results)
  }
};
