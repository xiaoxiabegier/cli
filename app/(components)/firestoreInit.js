import { initializeApp } from "firebase/app";
import {getFirestore, collection, query, where, getDocs} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAiGmFgzS1HJefVKV-r8El-t7q3kZYXccU",
    authDomain: "cybernetic-stream.firebaseapp.com",
    projectId: "cybernetic-stream",
    storageBucket: "cybernetic-stream.appspot.com",
    messagingSenderId: "134129148133",
    appId: "1:134129148133:web:b0ba9c2912a0e3b116f40c"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
