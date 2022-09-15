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

btnSubmit.addEventListener('click', () => {
  let wordUser = '';
  for (i = 0; i < letters.length; i++) {
    wordUser += letters[i].value.toUpperCase();
  }
  if (wordUser === wordDay) {
    alert('Correct!');
  } else {
    alert('Incorrect!');
  }
});