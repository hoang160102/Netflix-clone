<template>
  <main-content>
    <section class="relative">
      <header
        class="bg-transparent flex items-center justify-between py-6 px-10"
      ></header>
      <div class="absolute h-screen w-screen top-0 left-0">
        <div class="h-full w-full bg absolute top-0 left-0"></div>
        <div class="w-full h-full bg-img">
          <img class="h-full w-full" src="../assets/website.jpg" alt="" />
          <div
            class="signup-container h-full flex justify-center items-center absolute"
          >
            <form @submit.prevent="submitForm" class="signup-form text-white">
              <h2 class="mb-5 text-center text-2xl">Manage Account</h2>
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
                  disabled
                  type="email"
                  v-model="email"
                  placeholder="Email"
                  required
                  class="bg-zinc-700 email w-full p-3 mb-2"
                />
              </div>
              <button
                type="submit"
                :disabled="!isFormValid"
                class="signup-button w-full p-3"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main-content>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore()
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const isFormValid = computed(() => {
  return (
    email.value.length > 1 &&
    firstName.value.length >= 1 &&
    lastName.value.length >= 1
  );
});

const submitForm = async () => {
      if (isFormValid.value) {
        await store.dispatch('auth/auth/updateAccount',{
          firstName: firstName.value,
          lastName: lastName.value
        });
      }
    };

const initial = async () => {
  await store.dispatch('auth/auth/getCurrentUser');
  firstName.value = store.state.auth.auth.fullInfoUser.firstName;
  lastName.value = store.state.auth.auth.fullInfoUser.lastName;
  email.value = store.state.auth.auth.fullInfoUser.email;
};

onMounted(async () => {
  await initial();
});
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
.email:hover {
  cursor: not-allowed;
}
</style>
