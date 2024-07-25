<template>
    <router-link :to="watchEpisode">
        <div class="episode relative">
          <img v-if="image" :src="`https://image.tmdb.org/t/p/original${image}`" alt="" />
          <img v-else :src="`https://image.tmdb.org/t/p/original${backdrop}`" alt="">
          <div class="cover absolute overflow-hidden top-0 left-0">
              <div class="ep-info left-0 mt-2 px-2">
                <div class="title text-sm text-white">
                  {{ num }}. {{ name }}
                </div>
              <div class="desc text-xs text-white mt-4">{{ overview }}</div>
            </div>
          </div>
        </div>
    </router-link>
</template>

<script setup>
import { computed, defineProps } from 'vue';
const props = defineProps({
  image: String,
  id: Number,
  num: Number,
  name: String,
  overview: String,
  season: Number,
  seriesId: String,
  backdrop: String
})
const watchEpisode = computed(() => {
  return {
    name: "Play TV Show",
    params: { tvId: props.seriesId },
    query: { season: props.season, ep: props.num}
  }
})
</script>

<style scoped>
.episode {
  transition: all 0.3s ease;
  border-radius: 10px;
  cursor: pointer;
}
.episode:hover {
  scale: 1.2;
}

.episode:hover .cover {
  display: block;
}

.cover {
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  display: none;
  border-radius: 10px;
  height: 100%;
}

img {
  border-radius: 10px;
}


</style>
