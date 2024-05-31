<template>
    <h1>asdasd</h1>
</template>

<script>
import { movies } from '@/state/helpers';
export default {
  data() {
    return {}
  },
  props: ["id"],
  computed: {
    ...movies.moviesComputed
  },
  methods: {
    ...movies.moviesMethods
  },
  created() {
    console.log(this.id)
    // this.getMovieById(this.id)
    // console.log(this.userMovie)
  },
};
</script>