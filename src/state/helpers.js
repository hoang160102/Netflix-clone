import { moviesComputed, moviesMethods } from "./modules/movies"
import { authComputed, authMethods, authGetters } from "./modules/auth"

export const movies = { moviesComputed, moviesMethods }

export const auth = { authComputed, authMethods, authGetters }



