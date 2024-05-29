<template>
  <section class="relative">
    <header class="bg-transparent flex items-center justify-between py-6 px-10">
      <div class="z-10 logo font-bold text-red-600">NETFLIX</div>
      <router-link
        class="z-10 bg-red-600 text-lg px-4 rounded-md text-white font-extralight py-1 flex items-center"
        :to="{ name: 'Login' }"
        >Sign in</router-link
      >
    </header>
    <main class="absolute h-screen w-screen top-0 left-0">
      <div class="h-full w-full bg absolute top-0 left-0"></div>
      <div class="w-full h-full bg-img">
        <img class="h-full w-full" src="../assets/website.jpg" alt="" />
        <div
          class="jumbotron absolute w-full flex flex-col justify-center items-center"
        >
          <div class="title text-white text-center font-semibold mb-7">
            See What's next
          </div>
          <div class="desc text-white text-center mb-7 font-light">
            WATCH ANYWHERE CANCEL ANYWHERE
          </div>
          <router-link
            class="text-white px-10 rounded-xl start py-7 bg-red-600 font-light"
            :to="{ name:'Login'}"
            >START NOW</router-link
          >
        </div>
      </div>
    </main>
  </section>
</template>

<style scoped>
.logo {
  font-size: 40px;
}

.px-4 {
  height: 40px;
}

.bg {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0) 95%
  );
}

.title {
  font-size: 6rem;
  line-height: 1;
}

.desc,
.start {
  font-size: 1.875rem; /* 30px */
  line-height: 2.25rem; /* 36px */
}

.jumbotron {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

@media screen and (max-width: 800px) {
  .bg {
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 1) 25%,
      rgba(0, 0, 0, 0.8) 35%,
      rgba(0, 0, 0, 0.6) 45%,
      rgba(0, 0, 0, 0) 100%
    );
    height: 100%;
  }
  .jumbotron {
    bottom: -20px;
    top: unset;
  }
}

@media screen and (max-width: 1200px) {
  .title {
    font-size: 3.75rem; /* 60px */
    line-height: 1;
  }

  .desc,
  .start {
    font-size: 1.5rem; /* 24px */
    line-height: 2rem; /* 32px */
  }
}
</style>
