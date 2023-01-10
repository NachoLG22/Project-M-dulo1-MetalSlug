const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const btn = document.getElementById("start-btn");
btn.onclick = () => {
  const welcome = document.getElementById("welcome");
  welcome.style.display = "none";
  canvas.style.display = "block";
  game.start();
};

const btnControls = document.getElementById("control-btn");
btnControls.onclick = () => {
  const welcome = document.getElementById("welcome");
  welcome.style.display = "none";

  const controlPage = document.getElementById("secondPage");
  controlPage.style.display = "block";
};

const btnReturn = document.getElementById("return-btn");
btnReturn.onclick = () => {
  const welcome = document.getElementById("welcome");
  welcome.style.display = "block";

  const controlPage = document.getElementById("secondPage");
  controlPage.style.display = "none";
};

const btnMenu = document.getElementById("menu-btn");
btnMenu.onclick = () => {
  const welcome = document.getElementById("welcome");
  welcome.style.display = "block";

  const controlPage = document.getElementById("secondPage");
  controlPage.style.display = "none";

  const controlGame = document.getElementById("game-over");
  controlGame.style.display = "none";
  canvas.style.display = "none";
};
