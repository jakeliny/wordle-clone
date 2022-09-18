import {
  db,
  collection,
  addDoc,
  updateDoc,
  getDocs
} from './firebase.js';
import { fiveLettersWord } from './words_data.js';


export async function seedWords() {
  const wordsCollection = collection(db, 'words');
  fiveLettersWord.map(word => {
    addDoc(wordsCollection, {
      word,
      guessed: false,
    });
  })
}

export async function seedUpdateWordsWithRandomField() {
  const wordsCollection = collection(db, 'words');
  const querySnapshot = await getDocs(wordsCollection);

  for (let i = 0; i <= 1000; i++) {
    updateDoc(querySnapshot.docs[i].ref, {
      random: i
    });
  }
}