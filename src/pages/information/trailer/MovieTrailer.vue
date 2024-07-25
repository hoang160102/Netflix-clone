<template>
    <iframe class="mx-3 my-3" allowfullscreen :src="`https://www.youtube.com/embed/${videoKey}`" frameborder="0"></iframe>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
    videoKey: String,
    id: String
})
</script>

<style scoped>
iframe {
    width: 450px;
    height: 225px;
    border-radius: 10px;
  }
</style>