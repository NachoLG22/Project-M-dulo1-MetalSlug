const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

const btn = document.getElementById("start-btn");
btn.onclick = () => {
  const welcome = document.getElementById("welcome");
  welcome.style.display = "none"
  canvas.style.display = "block";
  game.start();
};

const btnControls = document.getElementById("control-btn");
btnControls.onclick = () => {
  const welcome = document.getElementById("welcome");
  welcome.style.display = "none"

  const conntrolPage = document.getElementById("secondPage");
  conntrolPage.style.display = "block";
};
