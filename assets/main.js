import {
  validateLetters,
  checkContainLetters,
  checkLettersPosition,
  makeWordUser,
  verifyWordDay
} from "./validations.js";

const main = document.querySelector('main');
const pastLetters = [];
let lettersNow = [];
let wordElement = '';
let wordUser = '';
let wordDay = '';

function newLine() {
  if (lettersNow.length != 0) {
    disabledLetters();
  }
  wordElement = main.appendChild(document.createElement('div'));
  wordElement.classList.add('word');
  
  wordDay.forEach((_,i) => {
    lettersNow.push(wordElement.appendChild(document.createElement('input')));
    lettersNow[i].classList.add('letter');
    lettersNow[i].setAttribute("maxlength", "1");
  });

  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
      e.key == 'Backspace' && e.target.previousElementSibling.focus();
      e.target.value.length == 1 && e.target.nextElementSibling.focus();
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
    newLine();
    return
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
