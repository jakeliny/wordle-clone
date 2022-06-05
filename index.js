const wordToday = "ARROZ".toUpperCase();

const submit = document.querySelector('#submit');
const word = [
  document.querySelector('#word1'),
  document.querySelector('#word2'),
  document.querySelector('#word3'),
  document.querySelector('#word4'),
  document.querySelector('#word5')
];

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const wordComplete = word[0].value + word[1].value + word[2].value + word[3].value + word[4].value;

  console.log(wordComplete);

  if (wordComplete.toUpperCase() === wordToday.toUpperCase()) {
    alert("You win!")
    return
  }

  word.forEach((letter, index) => {
    if (letter.value.toUpperCase() === wordToday.split('')[index].toUpperCase()) {
      console.log('correct position na', word[index].value)
      word[index].classList.add('correct-position')
      return
    }

    wordToday.split('').forEach((letterToday) => {
      if (letterToday.toUpperCase() === letter.value.toUpperCase()) {
        word[index].classList.add('correct-letter')
      }
    })


  });

})