let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;


let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");

//game starts when the keyboard key is pressed

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

//the games the gives the sequence when the game color apper the white color displayed

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

//when the user press button the green color displays

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

//when the sequnces matches the level is incresed again calling the gameflash which give the sequence of the color
function levelUp() {
  userSeq = []; //reset the user input sequence
  level++;

  h2.innerText = `level  ${level}`;
  //level++,button flsh,level update

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  //   console.log(randIdx);
  //   console.log(randColor);
  //   console.log(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

// to check whwther the sequence of the user matches the game sequence

function checkAns(level) {
  console.log(`current level ${level}`);
  let idx = level - 1;
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    h2.innerHTML = `Game Over! your highest score as <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
    
    reset();
  }
}

//when the user press the button
function btnPress() {
  console.log(this.value);
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
