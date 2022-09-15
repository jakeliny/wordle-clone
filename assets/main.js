import {
  validateLetters,
  checkWord,
  checkContainLetters,
  checkLettersPosition,
  makeWordUser
} from "./validations.js";

const words = document.querySelector('#box-words');
const btnSubmit = document.querySelector('#btn-submit');

const wordDay = 'NAVIO';

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
  for (let i = 0; i < wordDay.length; i++) {
    lettersNow.push(word.appendChild(document.createElement('input')));
  }
}

function disabledLetters() {
  lettersNow.map(letter => {
    letter.setAttribute("disabled", "disabled");
  })
  pastLetters.push(lettersNow);
  word.classList.add('past-word');
  wordUser = '';
  lettersNow = [];
}

function youWin() {
  disabledLetters();
  alert('You Win!');
}


btnSubmit.addEventListener('click', async () => {
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

});

window.document.onload = newLine();