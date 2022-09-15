const words = document.querySelector('#box-words');
const btnSubmit = document.querySelector('#btn-submit');
const btnNewLine = document.querySelector('#btn-new-line');

const wordDay = 'NAVIO';
const allLettersString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allLetters = allLettersString.split('');

const pastLetters = [];
let lettersNow = [];
let word = '';
let wordUser = '';

function newLine() {
  if (lettersNow.length != 0) {
    disabledLetters();
  }
  word = words.appendChild(document.createElement('div'));
  word.classList.add('word');
  for (i = 0; i < wordDay.length; i++) {
    lettersNow.push(word.appendChild(document.createElement('input')));
  }
}

function disabledLetters() {
  lettersNow.map(letter => {
    letter.setAttribute("disabled", "disabled");
  })
  pastLetters.push(lettersNow);
  word.classList.add('past-word');
  clearWordAndLetter()
  wordUser = '';
  lettersNow = [];
}

async function makeWordUser() {
  lettersNow.map(letter => {
    wordUser += letter.value.toUpperCase();
  });
  return;
}

function checkWord() {
  if (wordUser === wordDay) {
    return true;
  }
  return false;
}

function checkLettersPosition() {
  lettersNow.map(letter => {
    if (letter.value.toUpperCase() === wordDay[lettersNow.indexOf(letter)]) {
      letter.classList.add('corretLetterPosition');
    }
  });
}

function checkContainLetters() {
  lettersNow.map(letter => {
    if (wordDay.includes(letter.value.toUpperCase())) {
      letter.classList.add('corretLetter');
    }
  });
}

function youWin() {
  disabledLetters();
  alert('You Win!');
}

async function validateLetters() {
  console.log(wordUser.length, wordUser)
  if (wordUser.length != wordDay.length) {
    return "Sua palavra não é válida";
  }

  const response = await fetch(`https://significado.herokuapp.com/v2/${wordUser.toLocaleLowerCase()}`);
  if (!response.ok) {
    return "Não reconheço essa palavra";
  }

  return true

}

btnSubmit.addEventListener('click', async () => {
  await makeWordUser()
  const isValidate = await validateLetters()
  if (isValidate !== true) {
    alert(isValidate);
    wordUser = '';
    return;
  }
  if (!checkWord()) {
    checkContainLetters();
    checkLettersPosition();
    newLine();
    return
  }
  youWin();

});

window.document.onload = newLine();