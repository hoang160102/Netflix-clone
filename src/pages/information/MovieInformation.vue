<template>
  <main-content> </main-content>
</template>

<script>
import { movies } from "@/state/helpers";
export default {
  data() {
    return {
      detail: [],
    };
  },
  computed: {
    ...movies.moviesComputed,
  },
  methods: {
    ...movies.moviesMethods,
    initial() {
        
    }
  },
  async created() {
    
  },
};
</script>
