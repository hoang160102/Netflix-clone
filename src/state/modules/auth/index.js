import { mapState, mapActions, mapGetters } from "vuex";
export const authComputed = {
    ...mapState('auth/auth', ['user'])
}

export const authMethods = {
    ...mapActions('auth/auth', ['register', 'login', 'getCurrentUser', 'logout'])
}

export const authGetters = {
    ...mapGetters('auth/auth', ['isLoggedIn'])
}