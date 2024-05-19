const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let matches = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let shuffledColors = shuffle(COLORS);

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createDivsForColors(colorArray) {
  let counter = 0;
  for (let color of colorArray) {
    counter++;
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  console.log("you just clicked", event.target);
  let clickedCard = event.target;
  if (clickedCard.classList.contains("active")) {
    return;
  }
  if (!card1) {
    card1 = clickedCard;
    clickedCard.style.backgroundColor = clickedCard.classList[0];
    clickedCard.classList.add("active");
  } else if (!card2) {
    card2 = clickedCard;
    clickedCard.classList.add("active");
    clickedCard.style.backgroundColor = clickedCard.classList[0];    
  } else {
    alert('You can only turn over two cards at once!');
    return;
  }
  if (card1 && card2) {
    checkForMatch();
  }
}

function checkForMatch() {
  if (card1.classList[0] === card2.classList[0]) {
    foundMatch();
    resetCurrentCards();
  } else {
    setTimeout(function() {
      card1.style.backgroundColor = 'white';
      card2.style.backgroundColor = 'white';
      resetCurrentCards();
    }, 1000)
  }
}

function resetCurrentCards() {
  card1.classList.remove("active");
  card2.classList.remove("active")
  card1 = null;
  card2 = null;
}

function foundMatch() {
 if (matches < 4) {
  matches++;
 } else {
  setTimeout(function() { 
    alert('You win! Click "OK" to restart');
    location.reload();
  }, 1000)
  
 }
}

document.addEventListener("DOMContentLoaded", createDivsForColors(shuffledColors));