/*   Create a list that holds all of your cards  */
// array of the card icons, two icon of the same type form the match
const icons = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];

//cards container
const cardsContainer = document.querySelector(".deck");

//array that "store" the "opened" cards after they are clicked
let openedCards = [];

//array of matched cards
let matchedCards = [];

/* --------------INITIALIZE THE GAME-------------- */

//Create cards. for loop over the array. each card get in icon from the list.
function init() {
	
  card = shuffle(icons);

  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);

    // Add Click Event to each Card
    click(card);
  }
}


/* --------------CLICK EVENT-------------- */

// First Click Indicator
let isFirstClick = true;

// Click Function
function click(card) {
	
  // Card Click Event
  card.addEventListener("click", function() {
	  
    if (isFirstClick) {
      // Start game timer
      startTimer();
      // Change  First Click indicator's value
      isFirstClick = false;
    }

    const currentCard = this;
    const previousCard = openedCards[0];

    // We have an existing OPENED card
    if (openedCards.length === 1) {
		
	  //show icon on cards //dissabled to avoid clicking twice
      card.classList.add("open", "show", "disable");
	  //push clicked cards
      openedCards.push(this);

      //compare our 2 opened cards
      compare(currentCard, previousCard);
    } else {
      // We don't have any opened cards
      currentCard.classList.add("open", "show", "disable");
      openedCards.push(this);
    }
  });
}

/* --------------COMPARE TWO SELECTED CARD-------------- */

function compare(currentCard, previousCard) {
 
  //Matcher (compare the icon on cards if are the same there is a match)
  if (currentCard.innerHTML === previousCard.innerHTML) {
	  
    // Matched
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);

    openedCards = [];

    // Check if the game is over!
    isOver();
	  
  } else {
	  
    //set time out to delay umached card. After 600 milliseconds do this
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
    }, 600);

    openedCards = [];
  }

  // Add New Move
  addMove();
}

/* --------------CHECK IF THE GAME IS OVER-------------- */

function isOver() {
  if (matchedCards.length === icons.length) {
    
	  // Stop game timer
    stopTimer();

    //Display modal
    gameOverMessage();
  }
}

/* --------------MODAL-------------- */

var modal = document.getElementById("simpleModal");

function gameOverMessage() {
  modal.style.display = "block";

  const totalMoves = document.querySelector("#total_moves");
  totalMoves.innerHTML = moves + 1;

  const totalSecond = document.querySelector("#total_Seconds");
  totalSecond.innerHTML = totalSeconds;

  var totalstar = document.querySelector("#total_rate");
  totalstar.innerHTML = starsContainer.innerHTML;
}

//play again btn
function playAgain() {
  modal.style.display = "none";
  cardsContainer.innerHTML = "";
  init();
  reset();
}

/* --------------MOVES COUNTER-------------- */

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  // Set the rating
  rating();
}

/* --------------RATING-------------- */

const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {
  if (moves < 20) {
    starsContainer.innerHTML = star + star + star;
  } else if (moves < 30) {
    starsContainer.innerHTML = star + star;
  } else {
    starsContainer.innerHTML = star;
  }
}

/* --------------TIMER-------------- */

const timerContainer = document.querySelector(".timer");
let liveTimer,
  totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + "s";

/*
 * We call this function to start our function, 
 * the totalSeconds will be increased 
 * by 1 after 1000ms (1 second!)
 * 
 * HINT: We need to call this function ONCE, and the best time to call it
 * is when the user click on a card (The first card!)
 * This means that our user is start playing now! ;)
 */
function startTimer() {
  liveTimer = setInterval(function() {
    // Increase the totalSeconds by 1
    totalSeconds++;
    // Update the HTML Container with the new time
    timerContainer.innerHTML = totalSeconds + "s";
  }, 1000);
}
/*
 * Our timer won't stop. To stop it, we should clearInterval!
 * We will call it when the game is over.
 * So, we will call it at the end of `isOver` function
 * 
 * HINT: That's why I created the `liveTimer` variable, 
 * to store the setInterval's function, so that we can stop it by its name!
 */
function stopTimer() {
  clearInterval(liveTimer);
}

/* --------------RESTART BUTTON-------------- */

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  // Delete ALL cards
  cardsContainer.innerHTML = "";

  // Call `init` to create new cards
  init();

  // Reset the game
  reset();
});

/* --------------RESET GAME VARIABLES-------------- */

function reset() {
  // Empty the `matchedCards` array
  matchedCards = [];

  // Reset `moves`
  moves = 0;
  movesContainer.innerHTML = moves;

  // Reset `rating`
  starsContainer.innerHTML = star + star + star;
  stopTimer();
  isFirstClick = true;
  totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds + "s";
}

/* --------------FIST TIME GAME START-------------- */
init();

/* --------------SHUFFLE-------------- */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}