<template>
    <footer class="p-4 text-white">
      <div class="container mx-auto">
        <div class="flex justify-center space-x-4 mb-4">
        <router-link to="/" class="text-white hover:text-gray-400"><i class="fab fa-facebook"></i></router-link>
        <router-link to="/" class="text-white hover:text-gray-400"><i class="fab fa-instagram"></i></router-link>
        <router-link to="/" class="text-white hover:text-gray-400"><i class="fab fa-twitter"></i></router-link>
        <router-link to="/" class="text-white hover:text-gray-400"><i class="fab fa-youtube"></i></router-link>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <router-link to="/" class="block text-gray-400 hover:underline">Audio Description</router-link>
          <router-link to="/" class="block text-gray-400 hover:underline">Investor Relations</router-link>
          <router-link to="/" class="block text-gray-400 hover:underline">Legal Notices</router-link>
        </div>
        <div>
          <router-link to="/" class="block text-gray-400 hover:underline">Help Center</router-link>
          <router-link to="/" class="block text-gray-400 hover:underline">Jobs</router-link>
          <router-link to="/" class="block text-gray-400 hover:underline">Cookie Preferences</router-link>
        </div>
        <div>
          <router-link to="/" class="block text-gray-400 hover:underline">Gift Cards</router-link>
          <router-link to="/" class="block text-gray-400 hover:underline">Terms of Use</router-link>
          <router-link to="/" class="block text-gray-400 hover:underline">Corporate Information</router-link>
        </div>
        <div>
          <router-link to="/" class="block text-gray-400 hover:underline">Media Center</router-link>
          <router-link to="/" class="block text-gray-400 hover:underline">Privacy</router-link>
          <router-link to="/" class="block text-gray-400 hover:underline">Contact Us</router-link>
        </div>
      </div>
      <div class="justify-center mt-4">
        <button class="border px-4 py-2 text-sm hover:bg-gray-800">Service Code</button>
      </div>
      <div class="justify-center mt-4">
        <p class="text-xs text-gray-400">© 1997-2024 Netflix, Inc.</p>
      </div>
      </div>
    </footer>
</template>

<style scoped>
footer {
    background-color: #1a1a1a;
}

.container {
    max-width: 1200px;
}
</style>