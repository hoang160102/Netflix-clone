import { computed } from "vue";
import { useStore } from "vuex";
export default function infoFilm(rate, release, genre) {
  const store = useStore();
  store.dispatch("movies/movies/getAllGerne");
  const movieRate = computed(() => (rate * 10).toFixed(2));
  const movieRateColor = computed(() => {
    const percent = rate * 10;
    if (percent < 50) return "text-red-600";
    if (percent < 70) return "text-yellow-400";
    return "text-emerald-500";
  });
  const releaseDate = computed(() => release.replace(/-/g, "/"));
  const getGenre = computed(() => {
    return genre
      .map((id) => {
        const filmGenre = store.state.movies.movies.genres.find(
          (kind) => kind.id === id
        );
        return filmGenre ? filmGenre.name : null;
      })
      .filter((name) => name !== null)
      .join(", ");
  });
  return {
    movieRate,
    movieRateColor,
    releaseDate,
    getGenre,
  };
}
