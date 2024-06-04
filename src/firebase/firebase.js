import { initializeApp } from "firebase/app"
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAe0ON1xY1E50uxNjxfOQzvJPQkF_IhCaI",
  authDomain: "netflix-83bcf.firebaseapp.com",
  projectId: "netflix-83bcf",
  storageBucket: "netflix-83bcf.appspot.com",
  messagingSenderId: "753748752685",
  appId: "1:753748752685:web:5e0375bbcd89fc3ca0bba4",
  measurementId: "G-7WSXKKFWTC"
};
const app = initializeApp(firebaseConfig)
export default app