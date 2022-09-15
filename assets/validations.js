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

export const checkWord = (wordUser, wordDay) => {
  if (wordUser === wordDay) {
    return true;
  }
  return false;
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