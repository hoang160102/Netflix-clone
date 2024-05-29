<template>
   <img :src="`https://image.tmdb.org/t/p/original${image}`" alt="">
</template>

<script>
export default {
    props: ['image']
}
</script>