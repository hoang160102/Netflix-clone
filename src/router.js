import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import MoviePage from "./pages/MoviePage.vue";
import PopularFilm from "./pages/PopularFilm.vue"
import TelevisionShows from "./pages/TelevisionShows.vue";
import MyList from "./pages/MyList.vue";
import StartNow from "./pages/StartNow.vue";
import RegiserAccount from "./pages/RegisterAccount.vue";
import LoginAccount from "./pages/LoginAccount.vue";
import MovieInformation from "./pages/information/MovieInformation.vue";
import TvshowInformation from './pages/tv-information/TvshowInofmation.vue'
import SearchPage from './pages/SearchPage.vue'
import WatchSeries from "./pages/watch/WatchSeries.vue";
import WatchMovie from "./pages/watch/WatchMovie.vue"
import ManageProfile from "./pages/ManageProfile.vue";
import ForgotPassword from "./pages/ForgotPassword.vue"
// import store from "./state/store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
      meta: { title: "Home", requiresAuth: true },
    },
    {
      path: "/movies",
      name: "Movie",
      component: MoviePage,
      meta: { title: "Movie", requiresAuth: true },
    },
    {
      path: "/popular",
      name: "PopularFilm",
      component: PopularFilm,
      meta: { title: "Popular", requiresAuth: true },
    },
    {
      path: "/tv-shows",
      name: "TVShows",
      component: TelevisionShows,
      meta: { title: "TV Shows", requiresAuth: true },
    },
    {
      path: "/my-list",
      name: "MyList",
      component: MyList,
      meta: { title: "My List", requiresAuth: true },
    },
    {
      path: "/start-now",
      name: "StartNow",
      component: StartNow,
      meta: { title: "Start", requiresAuth: false },
    },
    {
      path: "/register",
      component: RegiserAccount,
      name: "Register",
      meta: { title: "Register", requiresAuth: false },
    },
    {
      path: "/login",
      component: LoginAccount,
      name: "Login",
      meta: { title: "Login", requiresAuth: false },
    },
    {
      path: "/account",
      component: ManageProfile,
      name: "Account",
      meta: { title: "Account", requiresAuth: true}
    },
    {
      path: "/forgot-password",
      component: ForgotPassword,
      name: "Forgot Password",
      meta: { title: "Forgot Password", requiresAuth: false }
    },
    {
      path: "/movie/:movieId",
      component: MovieInformation,
      name: "MovieDetail",
      meta: { title: "Movie Detail", requiresAuth: true}
    },
    {
      path: "/tv-show/:tvshowId",
      component: TvshowInformation,
      name: "TvShowDetail",
      meta: { title: "TV Show Detail", requiresAuth: true}
    },
    {
      path: "/search/:search",
      component: SearchPage,
      name: "Search",
      meta: { title: "Search", requiresAuth: true }
    },
    {
      path: "/tv-player/:tvId",
      component: WatchSeries,
      name: "Play TV Show",
      meta: { title: "Play", requiresAuth: true}
    },
    {
      path: "/movie-player/:movieId",
      component: WatchMovie,
      name: "Play Movie",
      meta: { title: "Play", requiresAuth: true }
    }
  ],
  scrollBehavior(to, from, savedPos) {
    if (savedPos) {
      return savedPos;
    }
    return { left: 0, top: 0 };
  },
});
router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | Netflix`;
  // let loggedIn = store.getters["auth/auth/isLoggedIn"];
  // console.log(loggedIn)
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // if (requiresAuth && !loggedIn) router.push({name: 'StartNow'});
  // else if (!requiresAuth && loggedIn) next({name: 'Home'});
  // else next();
  next()
});

export default router;
