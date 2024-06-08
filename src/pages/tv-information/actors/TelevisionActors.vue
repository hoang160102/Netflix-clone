<template>
  <div class="actor mx-5">
    <img :src="`https://image.tmdb.org/t/p/original${profile}`" alt="" />
    <div class="text-center text-white text-xl mt-3">{{ name }}</div>
    <div class="text-center text-slate-400">{{ castName }}</div>
  </div>
</template>

<script>
export default {
  props: ["profile", "id", "name", "castName"],
};
</script>

<style scoped>
.actor {
  max-width: 100%;
  max-height: 100%;
}

img {
  width: 100%;
  max-height: 100%;
  border-radius: 10px;
}
</style>
