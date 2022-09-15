const words = document.querySelector('#box-words');
const btnSubmit = document.querySelector('#btn-submit');
const btnNewLine = document.querySelector('#btn-new-line');

const wordDay = 'WORLD';
const allLettersString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allLetters = allLettersString.split('');

const pastLetters = [];
const lettersNow = [];
let word;

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
}

function checkWord() {
  let wordUser = '';

  lettersNow.map(letter => {
    wordUser += letter.value.toUpperCase();
  });

  if (wordUser === wordDay) {
    return true
  }
  return false
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

btnSubmit.addEventListener('click', () => {
  if (!checkWord()) {
    checkContainLetters();
    checkLettersPosition();
    newLine();
    return
  }
  alert('You win!');
  youWin();

});

window.document.onload = newLine();