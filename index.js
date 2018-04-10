//things to require
var inquirer = require("inquirer");
var Word = require("./word.js");

var words = ["GIANTS", "PADRES", "ATHLETICS", "YANKEES", "REDSOX"];
var guessesLeft = 5;
var guessedLetters = [];
var currentWord;

//start of the game
var gameStart = function() {
  //generates random number based on the words
  var num = Math.floor(Math.random() * words.length);
  currentWord = new Word(words[num]);
  currentWord.pushLetters();
  //displays current word as blanks.
  console.log("WELCOME TO MLB HANGMAN! ALL OF THE WORDS ARE BASEBALL TEAMS \n");
  console.log(currentWord.wordRender());
  promptUser();
};

var promptUser = function() {
  //asks player for a letter
  inquirer
    .prompt([
      {
        name: "userGuess",
        type: "input",
        message: "Please guess a letter: ",
      },
    ])
    .then(function(response) {
      //check if the user guessed the same letter twice
      var userLetter = response.userGuess.toUpperCase();
      var guessedAlready = false;
      for (var i = 0; i < guessedLetters.length; i++) {
        if (userLetter === guessedLetters[i]) {
          guessedAlready = true;
        }
      }

      if (guessedAlready) {
        console.log("Hey you already guessed that. Try something else!");
        promptUser();
      } else {
        guessedLetters.push(userLetter);

        var found = currentWord.letterFound(userLetter);
        //if none were found tell user they were wrong
        if (found === 0) {
          console.log("Nope! You guessed wrong.");
          guessesLeft--;
          console.log("Letters guessed: " + guessedLetters);
          console.log("Guesses remaining: " + guessesLeft);
          console.log(currentWord.wordRender());
          console.log("-----------------------\n");
          winLose();
        } else {
          console.log("Yes! You guessed right!");
          // display the user how many guesses remaining
          console.log("Letters guessed: " + guessedLetters);
          console.log("Guesses remaining: " + guessesLeft);
          console.log(currentWord.wordRender());
          console.log("-----------------------\n");
          winLose();
        }
      }
    });
};

function winLose() {
  if (currentWord.wordFound() === true) {
    console.log(currentWord.wordRender());
    console.log("Congratulations! You won the game!!!");
  } else if (guessesLeft === 0) {
    console.log("YOU'RE OUT OF GUESSES");
    console.log("The word was " + currentWord.word);
  } else {
    promptUser();
  }
}

gameStart();
