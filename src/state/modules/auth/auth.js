import app from "@/firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { useToast } from "vue-toastification";
import router from "@/router";
const toast = useToast();
const auth = getAuth(app);
const db = getFirestore(app);

export const state = {
  user: null,
  fullInfoUser: null,
  token: null
};

export const mutations = {
  userLoggedIn(state, data) {
    state.user = data;
  },
  logoutUser(state) {
    state.user = null
  },
  infoCurrentUser(state, data) {
    state.fullInfoUser = data
  },
  // setToken(state, data) {
  //   state.token = data
  //   localStorage.setItem('token', data);
  // }
};

export const actions = {
  async register(_, newUser) {
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((result) => {
        toast.success("Register Successfully");
        setDoc(doc(db, "users", result.user.uid), {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: newUser.password,
          id: result.user.uid,
          userList: []
        });
        setTimeout(() => {
          router.push({ name: "Login" });
        }, 1500);
      })
      .catch((err) => {
        if (err.code.includes("email-already-in-use")) {
          toast.error("Email was already used");
        }
      });
  },
  async login({commit}, user) {
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        toast.success("Login Successfully");
        // console.log(auth.currentUser.accessToken)
        // commit(auth.currentUser.accessToken)
        commit("userLoggedIn", {
          email: user.email,
          password: user.password
        });
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 1500);
      })
      .catch(() => {
        toast.error("Email or password is incorrect");
      });
  },
  async getCurrentUser({ commit }) {
    const usersCol = collection(db, "users");
    const userSnapshot = await getDocs(usersCol);
    try {
      const currentId = auth.currentUser.uid;
      const getUser = userSnapshot.docs.filter((doc) => {
        return doc.id === currentId;
      });
      const currentUser = {
        id: currentId,
        firstName: getUser[0].data().firstName,
        lastName: getUser[0].data().lastName,
        email: getUser[0].data().email,
        password: getUser[0].data().password,
        userList: getUser[0].data().userList
      };
      await commit("infoCurrentUser", currentUser);
    } catch (err) {
      return err;
    }
  },
  logout({commit}) {
    signOut(auth).then(() => {
      commit('logoutUser')
      router.push({name: 'Login'})
    })
  },
  // initializeStore({ commit }) {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     commit('setToken', token);
  //     // Optionally, fetch user data with the token and commit setUser
  //   }
  // }
};

export const getters = {
  isLoggedIn(state) {
    return !!state.user
  },
}

