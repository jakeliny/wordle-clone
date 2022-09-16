import {
  validateLetters,
  checkWord,
  checkContainLetters,
  checkLettersPosition,
  makeWordUser
} from "./validations.js";

const main = document.querySelector('main');

const wordDay = 'NAVIO';

const pastLetters = [];
let lettersNow = [];
let word = '';
let wordUser = '';

function newLine() {
  if (lettersNow.length != 0) {
    disabledLetters();
  }
  word = main.appendChild(document.createElement('div'));
  word.classList.add('word');
  for (let i = 0; i < wordDay.length; i++) {
    lettersNow.push(word.appendChild(document.createElement('input')));
    lettersNow[i].classList.add('letter');
    lettersNow[i].setAttribute("maxlength", "1");
  }
}

function disabledLetters(win = false) {
  lettersNow.map(letter => {
    win && letter.classList.add('win');
    letter.setAttribute("disabled", "disabled");
  })
  pastLetters.push(lettersNow);
  word.classList.add('past-word');
  wordUser = '';
  lettersNow = [];
}

function youWin() {
  disabledLetters(true);
  alert('You Win!');
}

window.document.onload = newLine();

async function submitWord() {
  wordUser = await makeWordUser(lettersNow)
  const isValidate = await validateLetters(wordUser, wordDay)
  if (isValidate !== true) {
    alert(isValidate);
    wordUser = '';
    return;
  }
  if (!checkWord(wordUser, wordDay)) {
    checkContainLetters(lettersNow, wordDay);
    checkLettersPosition(lettersNow, wordDay);
    newLine();
    return
  }
  youWin();

}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') submitWord();
});
