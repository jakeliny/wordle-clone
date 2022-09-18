import {
  db,
  collection,
  addDoc,
  getDocs,
} from './firebase.js';

export async function verifyWordDay() {
  let wordDay = '';
  const querySnapshot = await getDocs(collection(db, "words"));
  querySnapshot.forEach(doc => {
    doc.data().date == new Date().toLocaleDateString() && (wordDay = doc.data().word);
  });

  if (!wordDay) {
    wordDay = await generateWord();
    await addDoc(collection(db, "words"), {
      word: wordDay,
      date: new Date().toLocaleDateString()
    });
  }

  return wordDay;
}

async function generateWord() {

  const apiword = await fetch('https://api.dicionario-aberto.net/random')
  const wordData = await apiword.json();
  if (wordData.word.length == 5) {
    return wordData.word.toUpperCase()
  };
  return generateWord();
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