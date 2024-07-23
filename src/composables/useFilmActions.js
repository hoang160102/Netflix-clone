import { computed } from "vue";
import { useStore } from "vuex";
export default function useAddFilms(listItems, likeItems, id, type) {
  const store = useStore();
  const isMovieInList = computed(() => {
    const movie = listItems.value.some((film) => {
      return id === film.id;
    });
    return movie;
  });
  const isRatedFilm = computed(() => {
    const film = likeItems.value.some((item) => {
      return item === id;
    });
    return film;
  });
  const callFilmDetail = async () => {
    if (type === "movie") {
      await store.dispatch("movies/movies/getMovieById", id);
    } else {
      await store.dispatch("movies/movies/getTvShowById", id);
    }
  };
  const addMovie = async () => {
    await callFilmDetail();
    let newDetail = JSON.parse(
      JSON.stringify(store.state.movies.movies.filmDetail)
    );
    newDetail.type = type;
    listItems.value.push(newDetail);
    await store.dispatch("movies/movies/addMovieToList", newDetail);
  };
  const removeMovie = async () => {
    const movie = await listItems.value.find((film) => {
      return id === film.id;
    });
    if (movie) {
      await store.dispatch("movies/movies/removeMovieFromList", movie);
      listItems.value = listItems.value.filter((film) => id !== film.id);
    }
  };
  const rating = async () => {
    await store.dispatch("movies/movies/rateFilms", id);
    likeItems.value.push(id);
  };
  const removeRating = async () => {
    const filmIndex = likeItems.value.findIndex((item) => id === item);
    if (filmIndex !== -1) {
      await store.dispatch(
        "movies/movies/removeRate",
        likeItems.value[filmIndex]
      );
      likeItems.value.splice(filmIndex, 1);
    }
  };
  const urlLink = computed(() => {
    return type === "movie"
      ? { name: "MovieDetail", params: { movieId: id } }
      : { name: "TvShowDetail", params: { tvshowId: id } };
  });
  
  const watchFilm = computed(() => {
    return type === "tv"
      ? {
          name: "Play TV Show",
          params: { tvId: id },
          query: { season: 1, ep: 1 },
        }
      : { name: "Play Movie", params: { movieId: id } };
  });
  return {
    isMovieInList,
    isRatedFilm,
    urlLink,
    watchFilm,
    addMovie,
    removeMovie,
    rating,
    removeRating,
  };
}
