import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6_Nks65EFqpz5XzMSkcQqfazHMb41b0A",
  authDomain: "social-media-2e1aa.firebaseapp.com",
  projectId: "social-media-2e1aa",
  storageBucket: "social-media-2e1aa.appspot.com",
  messagingSenderId: "852491175907",
  appId: "1:852491175907:web:8c787ae3f27c12a11242d6",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fireStore = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, fireStore, provider, storage };
