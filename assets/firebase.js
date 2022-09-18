import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
export {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  getDoc,
  where,
  limit,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAiyXjF7Td8Ljn4keEdBjTxs4bZNMGdxS4",
  authDomain: "wordle-clone-42620.firebaseapp.com",
  projectId: "wordle-clone-42620",
  storageBucket: "wordle-clone-42620.appspot.com",
  messagingSenderId: "1040967291608",
  appId: "1:1040967291608:web:1fb93c480fbb079b6afdad",
  measurementId: "G-TGRKCR2XQP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


