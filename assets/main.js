const words = document.querySelector('#box-words');
const btnSubmit = document.querySelector('#btn-submit');

const wordDay = 'WORLD';
const allLettersString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const allLetters = allLettersString.split('');


const letters = [];

const word = words.appendChild(document.createElement('div'));
word.classList.add('word');

for (i = 0; i < wordDay.length; i++) {
  letters.push(word.appendChild(document.createElement('input')));
}

function checkWord() {
  let wordUser = '';

  for (i = 0; i < letters.length; i++) {
    wordUser += letters[i].value.toUpperCase();
  }

  if (wordUser === wordDay) {
    alert('Correct!');
    return true
  }
  return false
}

function checkLettersPosition() {
  for (i = 0; i < letters.length; i++) {
    if (letters[i].value.toUpperCase() === wordDay[i]) {
      letters[i].classList.add('correctPosition');
    }
  }
}

function checkContainLetters() {
  for (i = 0; i < letters.length; i++) {
    if (wordDay.includes(letters[i].value.toUpperCase())) {
      letters[i].classList.add('corretLetter');
    }
  }
}

btnSubmit.addEventListener('click', () => {
  if (!checkWord()) {
    checkContainLetters();
    checkLettersPosition();
  }
});