//constructor to display letters or "_" in our hangman game

var Letter = function(letter) {
  //store the letter guessed
  this.letter = letter;
  //auto to false
  this.display = false;
};

Letter.prototype.printWord = function() {
  if (this.letter == " ") {
    this.display = true;
    return "  ";
  }
  if (this.display === false) {
    return " _ ";
  } else {
    return this.letter;
  }
};

//export letter constructor
module.exports = Letter;
