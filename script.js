let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("resetBtn");
let newGameBtn = document.getElementById("new-game");
let msgContainer = document.getElementById("message");
let message = document.querySelector("#message");

// Reseting Game-
function resetGame() {
  // console.log("reset");
  turnO = true;
  enableBoxes();
  filledBoxes = 0;
  location.reload()
}

let turnO = true; //playerX, playerO
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //checking for player O turn
      box.innerHTML = "0";
      turnO = false;
    } else {
      //player X turn
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true; // for no leting user to click the box again.
    checkWinner(winPatterns);
  });
});

//-- Disabling all the buttons ones the winner is out later calling the same in showWinner/----
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//-- fn for when we start new game--
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
let filledBoxes = 0; // Counter for filled boxes


const checkWinner = () => {
  for (let patterns of winPatterns) {
    let posiVal1 = boxes[patterns[0]].innerText;
    let posiVal2 = boxes[patterns[1]].innerText;
    let posiVal3 = boxes[patterns[2]].innerText;

    
    if (posiVal1 !== "" && posiVal1 === posiVal2 && posiVal2 === posiVal3)// This is checking for non-empty value and all the three values are same. 
    /*Can also work like this:
    if (posiVal1 !== "" && posiVal2 !== "" && posiVal3 !== "") {
      if (posiVal1 === posiVal2 && posiVal2 === posiVal3) {
        // Code inside the block will be executed if the condition is true
      }
    }
    */
    
    {
      console.log(`Winner ${posiVal1}`);
      showWinner(posiVal1);
      return;
    }
  }

  filledBoxes++;
  if (filledBoxes === boxes.length) {
    // All boxes filled, and no winner found
    showDraw();
  }
};

function showWinner(winner) {
  const finalMessage = document.querySelector("#message");
  finalMessage.append((finalMessage.value = `The winner is:${winner}🎉`));
  disableBoxes();

  // msgContainer.classList.remove("hide");// will show the winner as someone win!
}
function showDraw() {
  const finalMessage = document.querySelector("#message");
  finalMessage.innerText = `Match Drawn🙂`;
  // alert("Match Drawn🙂")
  disableBoxes();
}

// newGameBtn.addEventListener("click",resetGame());

resetBtn.addEventListener("click", resetGame);


