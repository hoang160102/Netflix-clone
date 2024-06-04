import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import MoviePage from "./pages/MoviePage.vue";
import PopularFilm from "./pages/PopularFilm.vue"
import TelvisionShows from "./pages/TelvisionShows.vue";
import MyList from "./pages/MyList.vue";
import StartNow from "./pages/StartNow.vue";
import RegiserAccount from "./pages/RegisterAccount.vue";
import LoginAccount from "./pages/LoginAccount.vue";
import MovieInformation from "./pages/information/MovieInformation.vue";
import TvshowInformation from './pages/information/TvshowInofmation.vue'
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
      component: TelvisionShows,
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
