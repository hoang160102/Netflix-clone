<template>
  <main-content>
    <div class="w-full pt-4 flex flex-col items-center">
      <span class="text-slate-400 mb-3 text-3xl">This page is not found</span>
      <router-link class="underline text-slate-400" :to="{ name: 'Home' }">Back to homepage</router-link>
    </div>
  </main-content>
</template>
