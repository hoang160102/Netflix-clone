<template>
    <iframe class="mx-3 my-3" allowfullscreen :src="`https://www.youtube.com/embed/${videoKey}`" frameborder="0"></iframe>
</template>

<script>
export default {
    props: ['video-key', 'id'],
}
</script>

<style scoped>
iframe {
    width: 450px;
    height: 225px;
    border-radius: 10px;
  }
</style>