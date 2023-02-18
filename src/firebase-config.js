import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2nWiwDQUO65FBqQlGKhbJh9poN4PYPsg",
  authDomain: "petzonic-8318b.firebaseapp.com",
  projectId: "petzonic-8318b",
  storageBucket: "petzonic-8318b.appspot.com",
  messagingSenderId: "183268297315",
  appId: "1:183268297315:web:984c0f049e10e02091c656",
  measurementId: "G-LQ05RKBEH6"
};
  const app = initializeApp(firebaseConfig);
  

 
export const db = getFirestore(app);
export const storage=getStorage(app);