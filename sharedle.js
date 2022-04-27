const body = document.getElementsByTagName("body")[0];
storageCounter = 1; // is concatenated to a string to increment the row the letters are being inserted in
const wordleFlex = document.getElementById("container");
const keys = document.getElementsByClassName("keys");
const name = document.getElementById("name");

// for touchscreen devices
function keyAdd() {
  for (let j = 0; j < keys.length; j++) {
    keys[j].addEventListener("click", game);
  }
} keyAdd();

body.addEventListener("keydown", game);

function game(e) {
  // to type and insert letters
  if (e.key !== "Shift" && e.key !== "Meta" && e.key !== "Backspace" && e.key !== "Spacebar" && e.key !== "Enter" && e.key !== "Alt" && e.target.innerText !== "BACK" && e.target.innerText !== "ENTER" && e.key !== "CapsLock") {
    sessionStorage.setItem("classname", ("spots_"+storageCounter));
    spots = document.getElementsByClassName(sessionStorage.getItem("classname")); // the spot the letters are being put in
    for (let i = 0; i < 5; i++) {
      console.log(e.key); // not for touchscreen devices - returns undefined
      console.log(e.target.innerText); // for touchscreen
      if (spots[i].innerText == "") {
        if (navigator.appVersion.includes("iPhone")) {
          spots[i].innerText = e.target.innerText.toUpperCase();
          break;
        }
        else {
          spots[i].innerText = e.key.toUpperCase();
          break;
        }
      }
      else {continue;}
    }
  }

  // to delete letters
  if (e.key == "Backspace" || e.target.innerText == "BACK") {
    for (let i = 4; i >= 0; i--) {
      if (spots[i].innerText !== "") {
        spots[i].innerText = "";
        break;
      }
      else {continue;}
    }
  }

  // to enter the guess
  if (e.key == "Enter" || e.target.innerText == "ENTER") {
    guess = "";
    for (let i = 0; i < 5; i++) {
      guess += spots[i].innerText;
    }
    guess = guess.toLowerCase();
    console.log(guess);
    // if right
    if (guess == answer) {
      j = 0;
      while (j < 5) {
        spots[j].style.backgroundColor = "seagreen";
        j++;
      }
      document.getElementById("correct_answer").innerHTML = `Congratulations! You won! The answer was: <u>${answer.toUpperCase()}</u>`;
      var total = parseInt(localStorage.getItem("totalcorrect"));
      console.log(total);
      total += 1;
      console.log(total);
      localStorage.setItem("totalcorrect", total);
      gameStyling();
    }
    // conditional gaming logic if not right
    else {
      for (let i = 0; i < 5; i++) {
        // correct letter in the right spot
        if (guess[i] == answer[i]) {
          spots[i].style.backgroundColor = "seagreen";
        }
        // correct letter wrong spot
        else if (answer.includes(guess[i])) {
          spots[i].style.backgroundColor = "goldenrod";
        }
        // wrong letter
        else {
          spots[i].style.backgroundColor = "grey";
        }
      }
      // lost at the end of the game
      if (guess !== answer && sessionStorage.getItem("classname") == "spots_6") {
        document.getElementById("correct_answer").innerHTML = `You lost. The answer was: <u>${answer.toUpperCase()}</u>`;
        gameStyling();
      }
      storageCounter++; // increments the class #, ("spot_"+storageCounter)
    }
  }
}

// CSS based on OS
if (navigator.appVersion.includes("iPhone")) {
  let slots = document.getElementsByClassName("spots");
  for (let i = 0; i < slots.length; i++) {
    slots[i].style.height = "100px";
    slots[i].style.width = "100px";
    slots[i].style.fontSize = "50px";
  }
  document.getElementById("correct_answer").style.fontSize = "60px";
  document.getElementById("btn").style.fontSize = "50px";
} else {document.getElementById("keyboard").style.display = "none";}

document.getElementById("btn").addEventListener("click", function() {
  location.href = "index.html";
})

function gameStyling() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("container").style.opacity = "0.5";
}

function phoneOptimizationWarning() {
  if (navigator.appVersion.includes("iPhone")) {
    alert("Sorry, but this game has not been optimized for phones yet and has so far been designed for computers. If you'd like to, please play at your own disappointment.");
  }
} phoneOptimizationWarning();
