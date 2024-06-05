<template>
  <main-content>
    <h1 class="text-white">Search</h1>
    <!-- <movie-list :request-url="'search/movie?query=' + search"></movie-list> -->
  </main-content>
</template>

<!-- <script>
import MovieList from "@/layout/layoutSlider/MovieList.vue";
export default {
    data() {
      return {
        search: this.$route.params.search,
      };
    },
    computed: {
      query() {
        return this.$route.params.search;
      },
    },
    components: {
      MovieList,
    },
    watch: {
      query(value) {
        if (value !== null && value !== undefined) {
          console.log(this.$route.params);
          this.search = this.$route.params.search;
        }
      },
    },
};
</script> -->
