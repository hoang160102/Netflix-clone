import { mapState, mapActions, mapGetters } from "vuex";
export const authComputed = {
    ...mapState('auth/auth', ['user', 'fullInfoUser'])
}

export const authMethods = {
    ...mapActions('auth/auth', ['register', 'login', 'getCurrentUser', 'logout', 'updateAccount', 'resetPassword'])
}

export const authGetters = {
    ...mapGetters('auth/auth', ['isLoggedIn'])
}