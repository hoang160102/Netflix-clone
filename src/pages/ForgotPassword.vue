<template>
    <section class="relative">
    <header class="bg-transparent flex items-center justify-between py-6 px-10">
      <div class="z-10 logo font-bold text-red-600">NETFLIX</div>
    </header>
    <div class="absolute h-screen w-screen top-0 left-0">
      <div class="h-full w-full bg absolute top-0 left-0"></div>
      <div class="bg-img w-full h-full">
        <img class="h-full w-full" src="../assets/website.jpg" alt="" />
        <div class="login-container h-full flex justify-center items-center absolute">
          <form @submit.prevent="resetPass" class="login-form text-white">
            <h2 class="mb-5 text-3xl text-center">Forgot Password</h2>
            <div class="form-group mb-3">
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                required
                class="bg-zinc-700 w-full p-3"
              />
            </div>
            <span class="mb-3">Enter your gmail to reset your password</span>
            <button
              type="submit"
              class="login-button w-full p-3 my-3"
            >
              Reset Password
            </button>
            <router-link class="underline text-sm font-extralight text-slate-400" :to="{ name: 'Login' }">Back to Login</router-link>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { auth } from '@/state/helpers'
export default {
  data() {
    return {
      email: ''
    }
  },
  computed: {
    ...auth.authComputed
  },
  methods: {
    ...auth.authMethods,
    async resetPass() {
      await this.resetPassword(this.email)
    }
  }
}
</script>

<style scoped>
.logo {
  font-size: 40px;
}

.px-4 {
  height: 40px;
}

.bg {
  background: rgba(0, 0, 0, 0.5);
}

.login-container {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.login-form {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 450px;
  padding: 50px;
}

.form-group input {
  border: none;
  border-radius: 5px;
}

.login-button {
  background-color: #e50914;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
</style>