<template>
    <main>
      <router-view></router-view>
    </main>
</template>

<script>
export default {
  
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.mySwiper-banner .swiper-pagination-bullet {
  background-color: #fff!important;
  width: 40px !important;
  border-radius: 3px !important;
  height: 5px !important;
}

.mySwiper-slide {
  overflow: unset !important;
}

.mySwiper-slide .swiper-pagination {
  width: auto !important;
  position: absolute;
  right: 0 !important;
  left: unset !important;
  bottom: unset !important;
  top: -40px !important;
}


.mySwiper-slide .swiper-scrollbar {
  display: none !important;
}

.mySwiper-slide .swiper-pagination-bullet {
  background-color: #fff!important;
  width: 20px !important;
  border-radius: 3px !important;
  height: 2px !important;
}

.mySwiper-slide .swiper-button-prev {
  left: -35px !important;
}

.mySwiper-slide .swiper-button-next {
  right: -35px !important;
}

.mySwiper-slide .swiper-button-prev, .mySwiper-slide .swiper-button-next {
  color: #fff !important;
}
 
main {
  min-height: 100vh;
  overflow-x: hidden;
}

/* html {
    overflow-x: hidden;
    width: 100%
} */
</style>
