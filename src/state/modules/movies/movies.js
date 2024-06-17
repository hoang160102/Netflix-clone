import axios from "axios";
import app from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
const auth = getAuth(app);
const db = getFirestore(app);

// const options = {
//   method: "POST",
//   headers: {
//     accept: "application/json",
//     "Content-Type": "application/json;charset=utf-8",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTZmZTMxOWQzNmYxYmFlYmRlYjU5YzhlMzE1NmRjNSIsInN1YiI6IjY2NDViMjFiMDdmOTg5MTFkNTk1MzQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k7WXuBj-_qJnRJIAvd7glZunlTquoVR4TDFEz5exBJQ",
//   },
//   body: '"like"'
// };

const API_KEY = "?api_key=716fe319d36f1baebdeb59c8e3156dc5";
export const state = {
  movieList: [],
  movieBanner: [],
  genres: [],
  filmDetail: [],
  bannerMoviePage: [],
  bannerTvShowPage: [],
  tvGenre: [],
  allMovies: [],
  allTvShows: [],
  popularMovies: [],
  popularTvShows: [],
  movieSlide: null,
  actors: [],
  video: [],
  episodes: [],
  recommendations: [],
  filmSearching: []
};

export const mutations = {
  //   fetchMovieList(state, data) {
  //     state.movieList = data;
  //     console.log(state.movieList)
  //   },
  fetchAllMovies(state, data) {
    state.allMovies = data;
  },
  fetchMovieBanner(state, data) {
    state.movieBanner = data;
  },
  fetchGenres(state, data) {
    state.genres = data;
  },
  fetchMovieSlide(state, data) {
    state.movieSlide = data;
  },
  fetchFilmDetail(state, data) {
    state.filmDetail = data;
  },
  fetchBannerMoviePage(state, data) {
    state.bannerMoviePage = data;
  },
  fetchPopularMovies(state, data) {
    state.popularMovies = data;
  },
  fetchPopularTvShows(state, data) {
    state.popularTvShows = data;
  },
  fetchGenreTvShows(state, data) {
    state.tvGenre = data;
  },
  fetchTvShows(state, data) {
    state.allTvShows = data;
  },
  fetchBannerTvShows(state, data) {
    state.bannerTvShowPage = data;
  },
  fetchActors(state, data) {
    state.actors = data;
  },
  fetchVideo(state, data) {
    state.video = data;
  },
  fetchEpisodes(state, data) {
    state.episodes = data
  },
  fetchRecommendations(state, data) {
    state.recommendations = data
  },
  fetchSearch(state, data) {
    state.filmSearching = data
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
  async getAllGerne({ commit }) {
    const result = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list" + API_KEY
    );
    commit("fetchGenres", result.data.genres);
  },
  async getMovieSlide({ commit }, url) {
    const result = await axios.get(
      `https://api.themoviedb.org/3${url}${API_KEY}`
    );
    commit("fetchMovieSlide", result.data.results);
  },
  async addMovieToList(_, movie) {
    const userListRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userListRef, {
      userList: arrayUnion(movie),
    });
  },
  async removeMovieFromList(_, movie) {
    const userListRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userListRef, {
      userList: arrayRemove(movie),
    });
  },
  async getMovieById({ commit }, id) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}${API_KEY}`
    );
    commit("fetchFilmDetail", result.data);
  },
  async getTvShowById({ commit }, id) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}${API_KEY}`
    );
    commit("fetchFilmDetail", result.data);
  },
  async getBannerMoviePage({ commit }) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day${API_KEY}`
    );
    commit("fetchBannerMoviePage", result.data.results.splice(0, 10));
  },
  async getPopularMovies({ commit }) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/popular${API_KEY}`
    );
    commit("fetchPopularMovies", result.data.results);
  },
  async getPopularTvShows({ commit }) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/tv/popular${API_KEY}`
    );
    commit("fetchPopularTvShows", result.data.results);
  },
  async getGenreTvShows({ commit }) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list${API_KEY}`
    );
    commit("fetchGenreTvShows", result.data);
  },
  async getTvShows({ commit }) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/tv${API_KEY}`
    );
    commit("fetchTvShows", result.data.results);
  },
  async getBannerTvShow({ commit }) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/tv${API_KEY}`
    );
    commit("fetchBannerTvShows", result.data.results.splice(0, 10));
  },
  // get cast
  async getActors({ commit }, id) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits${API_KEY}`
    );
    commit("fetchActors", result.data.cast.splice(0, 15));
  },
  async getTvActors({ commit }, id) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/credits${API_KEY}`
    );
    commit("fetchActors", result.data.cast.splice(0, 15));
  },
  // getVideo
  async getVideo({ commit }, id) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos${API_KEY}`
    );
    commit("fetchVideo", result.data.results.splice(0, 3));
  },
  async getTvVideo({ commit }, id) {
    const result = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos${API_KEY}`
    );
    commit("fetchVideo", result.data.results.splice(0, 3));
  },
  // add rating
  // async addMovieRating(_, id) {
  //   await fetch(
  //     `https://api.themoviedb.org/3/movie/${id}/rating${API_KEY}`, {
  //       options,
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // },
  // async addTvShowRating(_, id) {
  //   const result = await axios.post(
  //     `https://api.themoviedb.org/3/tv/${id}/rating${API_KEY}`,
  //     {
  //       headers: headers,
  //     }
  //   );
  //   console.log(result);
  // },
  // episode
  async getEpisodes( {commit}, data) {
    const result = await axios.get(`https://api.themoviedb.org/3/tv/${data.id}/season/${data.ss}${API_KEY}`)
    commit('fetchEpisodes', result.data.episodes)
  },
  //get recommnedations
  async getMovieRecommendations({commit}, id) {
    const result = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations${API_KEY}`)
    commit("fetchRecommendations", result.data.results)
  },
  // search 
  async searchFilm({commit}, query) {
    const result = await axios.get(`https://api.themoviedb.org/3/search/multi${API_KEY}&query=${query}`)
    commit("fetchSearch", result.data.results)
  }
};
