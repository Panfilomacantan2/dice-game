//select the classes we require
let cube = document.querySelector(".cube");
let rollBtn = document.querySelector(".roll-btn");
let currentClass = "";
let diceInterval;
let rollDiceCounter = 0;
let diceResult;
let isPlayer2Turn = false;

// get the player names
swal("Enter player 1 name:", {
  content: "input",
}).then((value) => {
  if (
    value.trim().length === 0 ||
    value.trim() === null ||
    value.trim() === "" ||
    value.trim() === false
  ) {
    player1.name = "Ai";
    document.querySelector("#player1-name").innerText = player1.name;
  } else {
    player1.name = value.trim();
    document.querySelector("#player1-name").innerText = player1.name;
  }

  swal("Enter player 2 name:", {
    content: "input",
  }).then((value) => {
    if (
      value.trim().length === 0 ||
      value.trim() === null ||
      value.trim() === "" ||
      value.trim() === false
    ) {
      player2.name = "Ai";
      document.querySelector("#player2-name").innerText = player2.name;
    } else {
      player2.name = value.trim();
      document.querySelector("#player2-name").innerText = player2.name;
    }
  });
});

//player status object
let player1 = {
  name: "Ai",
  score: 0,
};
let player2 = {
  name: "Ai",
  score: 0,
};
//score goal
const SCOREGOAL = 30;

//this function will generate a random number between 1 and 6 (or whatever value you send it)
function getRandomInt(min, max) {
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
  );
}

//our main roll dice function on click
function rollDice() {
  //generate a random number between 1 and 6 with out getRandomInt function
  let randNum = getRandomInt(1, 7);
  //generate a class with the random number between 1 - 6 called showClass
  let showClass = "show-" + randNum;
  diceResult = randNum;

  cube.style.animation = `roll 1s infinite`;

  // if there is a class already selected remove it
  if (currentClass) {
    cube.classList.remove(currentClass);
  }
  // add the new showclass with the generated number
  cube.classList.add(showClass);
  //set the current class to the randomly generated number
  currentClass = showClass;

  // start dice interval
  diceInterval = setInterval(dicing, 1000);
  rollBtn.classList.add("clicked");
  rollBtn.innerText = "Rolling...";
  rollBtn.disabled = true;
}

// on click eventlistener for the button element
rollBtn.addEventListener("click", rollDice);

function dicing() {
  rollDiceCounter++;
  if (rollDiceCounter >= 5) {
    console.log(`Dice result is : ${diceResult}`);
    clearInterval(diceInterval);
    cube.style.animation = `none`;
    rollDiceCounter = 0;
    rollBtn.classList.remove("clicked");
    rollBtn.innerText = "Roll";
    rollBtn.disabled = false;

    if (isPlayer2Turn) {
      player2.score += diceResult;
      document.querySelector("#player2").innerText = player2.score;
      if (player2.score >= SCOREGOAL) {
        swal("Good job!", `${player2.name} wins!`, "success");
        resetGame();
        isPlayer2Turn = false;
      }
      document.querySelector("#turn").innerText = "Player 1";

      isPlayer2Turn = false;
    } else {
      player1.score += diceResult;
      document.querySelector("#player1").innerText = player1.score;
      if (player1.score >= SCOREGOAL) {
        swal("Good job!", `${player1.name} wins!`, "success");
        isPlayer2Turn = false;

        resetGame();
        document.querySelector("#turn").innerText = "Player 1";
      } else {
        isPlayer2Turn = true;
        document.querySelector("#turn").innerText = "Player 2";
      }
    }
  }
}

function resetGame() {
  player1.score = 0;
  player2.score = 0;
  document.querySelector("#player1").innerText = player1.score;
  document.querySelector("#player2").innerText = player2.score;
}
