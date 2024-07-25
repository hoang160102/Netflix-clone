<template>
  <section class="relative">
    <header class="bg-transparent flex items-center justify-between py-6 px-10">
      <div class="z-10 logo font-bold text-red-600">NETFLIX</div>
      <router-link
        class="z-10 bg-red-600 text-lg px-4 rounded-md text-white font-extralight py-1 flex items-center"
        :to="{ name: 'StartNow' }"
        >Sign in</router-link
      >
    </header>
    <div class="absolute h-screen w-screen top-0 left-0">
      <div class="h-full w-full bg absolute top-0 left-0"></div>
      <div class="w-full h-full bg-img">
        <img class="h-full w-full" src="../assets/website.jpg" alt="" />
        <div
          class="signup-container h-full flex justify-center items-center absolute"
        >
          <form @submit.prevent="submitForm" class="signup-form text-white">
            <h2 class="mb-3">Sign Up</h2>
            <div class="form-group mb-3">
              <input
                type="text"
                v-model="firstName"
                placeholder="First Name"
                required
                class="bg-zinc-700 w-full p-3 mb-2"
              />
            </div>
            <div class="form-group mb-3">
              <input
                type="text"
                v-model="lastName"
                placeholder="Last Name"
                required
                class="bg-zinc-700 w-full p-3 mb-2"
              />
            </div>
            <div class="form-group mb-3">
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                required
                class="bg-zinc-700 w-full p-3 mb-2"
              />
            </div>
            <div class="form-group mb-3">
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                required
                class="bg-zinc-700 w-full p-3 mb-2"
              />
              <div class="validate flex justify-between">
                <ul class="requirements">
                  <li :class="{ invalid: password.length < 6 }">
                    At least 6 characters long
                  </li>
                  <li :class="{ invalid: !/[A-Z]/.test(password) }">
                    One uppercase character
                  </li>
                </ul>
                <ul class="requirements">
                  <li :class="{ invalid: !/[a-z]/.test(password) }">
                    One lowercase character
                  </li>
                  <li :class="{ invalid: !/^[A-Za-z0-9]*$/.test(password) }">
                    Latin characters only
                  </li>
                </ul>
              </div>
            </div>
            <div class="form-group mb-3">
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="Confirm Password"
                required
                class="bg-zinc-700 w-full p-3 mb-2"
              />
            </div>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="signup-button w-full p-3"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isFormValid = computed(() => {
  return (
    password.value.length >= 6 &&
    /[A-Z]/.test(password.value) &&
    /[a-z]/.test(password.value) &&
    /^[A-Za-z0-9]*$/.test(password.value) &&
    password.value === confirmPassword.value &&
    email.value.length > 1 &&
    firstName.value.length >= 1 &&
    lastName.value.length >= 1
  );
});
const submitForm = () => {
  if (isFormValid.value) {
    store.dispatch("auth/auth/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
  }
};
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
.signup-container {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.signup-form {
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

.signup-button {
  background-color: #e50914;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.signup-button:disabled {
  background-color: grey;
  cursor: not-allowed;
}

.requirements {
  list-style: none;
  padding-left: 0;
  font-size: 13px;
}

.validate .requirements li {
  color: red;
}

.validate .requirements li.invalid {
  color: #f44336;
}

.validate .requirements li:not(.invalid) {
  color: #4caf50;
}
</style>
