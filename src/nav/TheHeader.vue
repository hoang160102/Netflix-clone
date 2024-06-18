<template>
  <header>
    <div class="header flex items-center justify-between px-10">
      <div class="flex items-center">
        <router-link
          class="font-bold logo text-red-600 mr-8"
          :to="{ name: 'Home' }"
          >NETFLIX</router-link
        >
        <ul class="nav flex">
          <li class="nav-tab">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="nav-tab">
            <router-link :to="{ name: 'Movie' }">Movies</router-link>
          </li>
          <li class="nav-tab">
            <router-link :to="{ name: 'PopularFilm' }">Popular</router-link>
          </li>
          <li class="nav-tab">
            <router-link :to="{ name: 'TVShows' }">TV Shows</router-link>
          </li>
          <li class="nav-tab">
            <router-link :to="{ name: 'MyList' }">My List</router-link>
          </li>
        </ul>
      </div>
      <div class="search-profile flex items-center">
        <div @click.stop class="search-bar">
          <div
            class="search-input-container p-1 flex items-center"
            :class="[
              { 'bg-zinc-700': this.width === '250px' },
              { 'border-white': this.width === '250px' },
            ]"
          >
            <svg-icon
              class="text-white mx-1 search-icon"
              @click="toggleSearchBar"
              type="mdi"
              :path="pathSearch"
            ></svg-icon>
            <input
              @keypress.enter="searching"
              type="text"
              class="search-input bg-zinc-700 outline-none text-white"
              placeholder="Titles, characters, genres"
              ref="searchInput"
              v-model="search"
              :style="inputWidth"
            />
          </div>
        </div>
        <div
          @mouseover="iconRotate"
          @mouseout="iconReRotate"
          class="profile-nav flex items-center"
        >
          <div class="user ml-4">
            <div
              v-if="current"
              class="info bg-slate-500 relative p-2 text-white"
            >
              {{ standName }}
            </div>
            <div class="subnav p-4 bg-slate-800 absolute" :style="display">
              <router-link
                :to="{ name: 'Account' }"
                class="edit-profile text-white font-extralight text-slate-400 font-sm flex"
              >
                <svg-icon type="mdi" :path="pathEdit" class="mr-2"></svg-icon>
                Manage Profile
              </router-link>
              <div
                class="sign-out mt-4 text-white font-extralight text-slate-400 font-sm flex"
                @click="signOut"
              >
                <svg-icon type="mdi" :path="pathLogOut" class="mr-2"></svg-icon>
                Log Out
              </div>
            </div>
          </div>
          <svg-icon
            class="text-white ml-1 menu-icon"
            type="mdi"
            :path="pathMenu"
            :style="iconStyle"
          ></svg-icon>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMagnify } from "@mdi/js";
import { mdiChevronDown } from "@mdi/js";
import { mdiAccountBoxEditOutline } from "@mdi/js";
import { mdiLogout } from "@mdi/js";
import { auth } from "@/state/helpers";
import { movies } from "@/state/helpers";
import router from "@/router";
export default {
  props: ["email"],
  data() {
    return {
      pathSearch: mdiMagnify,
      pathMenu: mdiChevronDown,
      pathEdit: mdiAccountBoxEditOutline,
      pathLogOut: mdiLogout,
      r: "0deg",
      width: "0px",
      border: "none",
      displaySubnav: "none",
      search: "",
      current: null,
    };
  },
  components: {
    SvgIcon,
  },
  computed: {
    ...movies.moviesComputed,
    ...auth.authComputed,
    iconStyle() {
      return {
        "--sx": 1.5,
        "--sy": 1.5,
        "--r": this.r,
      };
    },
    inputWidth() {
      return {
        width: this.width,
      };
    },
    display() {
      return {
        display: this.displaySubnav,
      };
    },
    standName() {
      return `${this.current.firstName
        .match(/(\b\S)?/g)
        .join("")}${this.current.lastName.match(/(\b\S)?/g).join("")}`;
    },
  },
  methods: {
    ...auth.authMethods,
    ...movies.moviesMethods,
    toggleSearchBar() {
      this.width = "250px";
      if (this.width === "250px") {
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.width = "0px";
      }
    },
    iconRotate() {
      this.r = "180deg";
      this.displaySubnav = "block";
    },
    iconReRotate() {
      this.r = "0deg";
      this.displaySubnav = "none";
    },
    signOut() {
      this.logout();
    },
    async searching() {
      await this.searchFilm(this.search);
      router.push({ name: "Search", params: { search: this.search } });
    },
    async initial() {
      await this.getCurrentUser();
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  async created() {
    await this.initial();
    this.current = this.fullInfoUser;
  },
};
</script>

<style scoped>
.logo {
  font-size: 30px;
}

header {
  background-color: black;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100vw;
}

.header {
  min-height: 70px;
}

.nav-tab {
  margin-left: 20px;
  font-size: 15px;
  color: #e5e5e5;
  transition: 0.2s all ease-in-out;
}

.nav-tab:hover {
  color: #b3b3b3;
}

.search-input:focus {
  border: none;
}

.search-icon {
  cursor: pointer;
}

.info {
  border-radius: 50%;
}

.profile-nav {
  cursor: pointer;
}

.search-input {
  transition: all 0.5s ease;
}

.menu-icon {
  transition: all 0.3s ease;
  transform-origin: center;
}

.subnav {
  width: 200px;
  right: 20px;
}

.nav-tab .router-link-active {
  color: #fff;
  font-weight: 600;
}
</style>
