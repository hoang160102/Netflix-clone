<template>
  <div class="actor mx-5">
    <img v-if="profile !== null" :src="`https://image.tmdb.org/t/p/original${profile}`" alt="" />
    <img v-else src="../../../assets/img/default-ava.png" alt="">
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
  aspect-ratio: calc(2/3);
  object-fit: cover;
}
</style>
