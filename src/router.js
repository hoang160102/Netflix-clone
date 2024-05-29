import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import MoviePage from "./pages/MoviePage.vue";
import PopularMovie from "./pages/PopularMovie.vue";
import TelvisionShows from "./pages/TelvisionShows.vue";
import MyList from "./pages/MyList.vue";
import StartNow from "./pages/StartNow.vue";
import RegiserAccount from "./pages/RegisterAccount.vue";
import LoginAccount from "./pages/LoginAccount.vue";
// import store from "./state/store";
import app from "./firebase/firebase";
import { getAuth } from "firebase/auth";

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
      name: "PopularMovie",
      component: PopularMovie,
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
      meta: { title: "Start" },
    },
    {
      path: "/register",
      component: RegiserAccount,
      name: "Register",
      meta: { title: "Register" },
    },
    {
      path: "/login",
      component: LoginAccount,
      name: "Login",
      meta: { title: "Login" },
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
  next();
  const auth = getAuth(app)
  const current = auth.currentUser
  // const loggedIn = store.getters["auth/auth/isLoggedIn"];
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !current) next({name: 'StartNow'});
  else if (!requiresAuth && current) next({name: 'Home'});
  else next();
  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //   if (!loggedIn) {
  //     next({
  //       path: "/start-now",
  //       // Save the intended route to redirect after login
  //     });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
});

export default router;
