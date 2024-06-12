<template>
  <the-header></the-header>
  <div class="layout">
    <slot></slot>
  </div>
  <the-footer class="pt-10"></the-footer>
</template>

<script>
import TheHeader from "@/nav/TheHeader.vue";
import TheFooter from "../nav/TheFooter.vue";
export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>
<style scoped>
.layout {
  background-color: #1a1a1a;
  min-height: 90vh;
}
</style>
