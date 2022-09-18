import {
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc
} from './firebase.js';

export async function verifyWordDay() {
  let wordDay = '';
  const querySnapshot = await getDocs(collection(db, "guess-words"));
  querySnapshot.forEach(doc => {
    doc.data().date == new Date().toLocaleDateString() && (wordDay = doc.data().word);
  });

  if (!wordDay) {
    wordDay = await generateWord();
    await addDoc(collection(db, "guess-words"), {
      word: wordDay,
      date: new Date().toLocaleDateString()
    });
  }

  return wordDay.toUpperCase();
}

async function generateWord() {
  const randomNumber = Math.floor(Math.random() * 1000);
  const wordsQuery = query(
    collection(db, "words"),
    where("guessed", "==", false),
    where("random", "==", randomNumber),
    limit(1)
  );
  const querySnapshot = await getDocs(wordsQuery);
  updateDoc(querySnapshot.docs[0].ref, {
    guessed: true
  });

  return querySnapshot.docs[0].data().word;
}

export const validateLetters = async (wordUser, wordDay) => {
  if (wordUser.length != wordDay.length) {
    return "Sua palavra não é válida";
  }

  const response = await fetch(`https://significado.herokuapp.com/v2/${wordUser.toLocaleLowerCase()}`);
  if (!response.ok) {
    return "Não reconheço essa palavra";
  }

  return true

}

export const checkLettersPosition = (lettersNow, wordDay) => {
  lettersNow.map(letter => {
    if (letter.value.toUpperCase() === wordDay[lettersNow.indexOf(letter)]) {
      letter.classList.add('corretLetterPosition');
    }
  });
}

export const checkContainLetters = (lettersNow, wordDay) => {
  lettersNow.map(letter => {
    if (wordDay.includes(letter.value.toUpperCase())) {
      letter.classList.add('corretLetter');
    }
  });
}

export const makeWordUser = async (lettersNow) => {
  let wordUser = '';
  lettersNow.map(letter => {
    wordUser += letter.value.toUpperCase();
  });
  return wordUser;
}