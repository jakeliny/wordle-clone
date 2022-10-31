import {
  validateLetters,
  checkContainLetters,
  checkLettersPosition,
  makeWordUser,
  verifyWordDay
} from "./validations.js";

const main = document.querySelector('main');
const pastLetters = [];
const attemptsLimit = 7
let lettersNow = [];
let wordElement = '';
let wordUser = '';
let wordDay = '';
let attemptsCounter = 1;

function newLine() {
  if (lettersNow.length != 0) {
    disabledLetters();
  }

  const divElement = document.createElement('div');
  wordElement = main.appendChild(divElement);
  wordElement.classList.add('word');

  const wordDayInArray = wordDay.split('');
  wordDayInArray.forEach((_, i) => {
    const inputElement = document.createElement('input');
    
    lettersNow.push(wordElement.appendChild(inputElement));
    lettersNow[i].classList.add('letter');
    lettersNow[i].setAttribute("maxlength", "1");
  })

  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        e.target.previousElementSibling?.focus();
      }

      if (e.target.value.length === 1 || e.key === 'ArrowRight') {
        e.target.nextElementSibling?.focus();
      }
    });
  });
}

function disabledLetters(win = false) {
  lettersNow.map(letter => {
    win && letter.classList.add('win');
    letter.setAttribute("disabled", "disabled");
  })
  pastLetters.push(lettersNow);
  wordElement.classList.add('past-word');
  wordUser = '';
  lettersNow = [];
}

function youWin() {
  disabledLetters(true);
  alert('You Win!');
}

function youLost() {
  disabledLetters(false);
  alert('You Lost.');
}

async function submitWord() {
  wordUser = await makeWordUser(lettersNow)
  const isValidate = await validateLetters(wordUser, wordDay)

  if (isValidate !== true) {
    alert(isValidate);
    wordUser = '';
    return;
  }

  if (wordUser != wordDay) {
    checkContainLetters(lettersNow, wordDay);
    checkLettersPosition(lettersNow, wordDay);

    if (attemptsCounter === attemptsLimit) {
      youLost();
      return;
    }

    newLine();
    attemptsCounter++;
    return;
  }

  youWin();
}

window.addEventListener('load', async (event) => {
  wordDay = await verifyWordDay();
  newLine();
});


document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') submitWord();
});
