const words = document.querySelector('#box-words');
const btnSubmit = document.querySelector('#btn-submit');

const wordDay = 'WORLD';
const allLettersString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allLetters = allLettersString.split('');


const lettersNow = [];

const word = words.appendChild(document.createElement('div'));
word.classList.add('word');

for (i = 0; i < wordDay.length; i++) {
  lettersNow.push(word.appendChild(document.createElement('input')));
}

function checkWord() {
  let wordUser = '';

  for (i = 0; i < lettersNow.length; i++) {
    wordUser += lettersNow[i].value.toUpperCase();
  }

  if (wordUser === wordDay) {
    alert('Correct!');
    return true
  }
  return false
}

function checkLettersPosition() {
  for (i = 0; i < lettersNow.length; i++) {
    if (lettersNow[i].value.toUpperCase() === wordDay[i]) {
      lettersNow[i].classList.add('correctPosition');
    }
  }
}

function checkContainLetters() {
  for (i = 0; i < lettersNow.length; i++) {
    if (wordDay.includes(lettersNow[i].value.toUpperCase())) {
      lettersNow[i].classList.add('corretLetter');
    }
  }
}

btnSubmit.addEventListener('click', () => {
  if (!checkWord()) {
    checkContainLetters();
  }
  checkLettersPosition();
});