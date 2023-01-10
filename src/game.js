class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;

    this.bg = new Background(ctx);
    this.player = new Player(ctx);
    this.soldiers = [];
    this.diCokkas = [];
    this.bombs = [];
    this.deadSoldiers = [];
    this.bombTick = 60 * 5;
    this.soldierTick = 60 * 5;
    this.diCokkaTick = 60 * 5;
    this.score = 0;
    this.life = 100;

    this.audio = new Audio(
      "resources/sounds/03 - Main Theme from Metal Slug (Stage 1).mp3"
    );
    this.audio.volume = 0.3;

    this.gameOverImg = new Image();
    this.gameOverImg.src = "resources/images/gameOver.png";
  }

  start() {
    this.stop();

    this.interval = setInterval(() => {
      this.gameOver();
      this.initListeners();
      this.audio.play();
      this.clear();
      this.clearDiCokka();
      this.clearSoldier();
      this.draw();
      this.checkCollisions();
      this.checkBulletCollisions();
      this.move();
      this.addSoldier();
      this.addDiCokka();
      this.addBombs();
      this.drawLife();
      this.drawScore();
      console.log(this.bombs);
      console.log(this.soldiers);
    }, 1000 / 60);
  }

  addSoldier() {
    if (this.score <= 100) {
      this.soldierTick--;

      if (this.soldierTick <= 0) {
        this.soldierTick = 100 + Math.random() * 60;
        this.soldiers.push(new Soldier(this.ctx));
      }
    }

    if (this.score > 100) {
      this.soldierTick--;
      if (this.soldierTick <= 0) {
        this.soldierTick = 100 + Math.random() * 60;
        this.soldiers.push(new Soldier(this.ctx));
      }
    }
  }

  addDiCokka() {
    if (this.score > 80) {
      this.diCokkaTick--;

      if (this.diCokkaTick <= 0) {
        this.diCokkaTick = 100 + Math.random() * 1000;
        this.diCokkas.push(new DiCokka(this.ctx));
      }
    }
  }

  addBombs() {
    if (this.score > 100) {
      this.bombTick--;

      if (this.bombTick <= 0) {
        this.bombTick = 100 + Math.random() * 60;
        this.bombs.push(new Bomb(this.ctx, 1.5));
      }
    }

    if (this.score > 150) {
      this.bombTick--;
      if (this.bombTick <= 0) {
        this.bombTick = 100 + Math.random() * 60;
        this.bombs.push(new Bomb(this.ctx, 3.5));
      }
    }
  }

  draw() {
    this.bg.draw();
    this.player.draw();
    this.diCokkas.forEach((diCokka) => diCokka.draw());
    this.soldiers.forEach((soldier) => soldier.draw());
    this.bombs.forEach((bomb) => bomb.draw());
  }

  move() {
    this.bg.move();
    this.player.move();
    this.soldiers.forEach((soldier) => soldier.move());
    this.diCokkas.forEach((diCokka) => diCokka.move());
    this.bombs.forEach((bomb) => bomb.move());
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  initListeners() {
    document.onkeydown = (e) => {
      this.player.onKeyDown(e.keyCode);
    };

    document.onkeyup = (e) => {
      this.player.onKeyUP(e.keyCode);
    };
  }

  checkCollisions() {
    const p = this.player;

    this.soldiers.forEach((soldier) => {
      const colX = p.x + p.w >= soldier.x && soldier.x + soldier.w >= p.x;
      const colY = soldier.y + soldier.h >= p.y && soldier.y <= p.y + p.h;

      if (colX && colY) {
        this.life = this.life - 10;
        console.log("colision!");
      }
    });

    this.diCokkas.forEach((diCokka) => {
      const colX = p.x + p.w >= diCokka.x && diCokka.x + diCokka.w >= p.x;
      const colY = diCokka.y + diCokka.h >= p.y && diCokka.y <= p.y + p.h;

      if (colX && colY) {
        this.life = this.life - 50;
        console.log("colision Dicokka");
      }
    });

    this.bombs.forEach((bomb) => {
      const colX = p.x + p.w >= bomb.x && bomb.x + bomb.w >= p.x;
      const colY = bomb.y + bomb.h >= p.y && bomb.y <= p.y + p.h;

      if (colX && colY) {
        this.bombCollidesPlayer(bomb);
        this.life = this.life - 20;
        console.log("colision bomb");
      }
    });
  }

  checkBulletCollisions() {
    this.player.bullets.forEach((bullet) => {
      this.soldiers.forEach((soldier) => {
        if (soldier.woundedBullet(bullet)) {
          this.bulletCollidesSoldier(soldier, bullet);
          this.score = this.score + 20;
          console.log("colision Soldier!!");
        }
      });
    });

    this.player.bullets.forEach((bullet) => {
      this.diCokkas.forEach((diCokka) => {
        if (diCokka.woundedBullet(bullet)) {
          this.bulletCollidesDikoka(diCokka, bullet);
          this.score = this.score + 20;
          console.log("colision DiCokka Bullet!!");
        }
      });
    });
  }

  bulletCollidesSoldier(soldier, bullet) {
    const soldierDead = this.soldiers.indexOf(soldier);
    this.soldiers.splice(soldierDead, 1);

    const bulletOff = this.player.bullets.indexOf(bullet);
    this.player.bullets.splice(bulletOff, 1);
  }

  bulletCollidesDikoka(diCokka, bullet) {
    const diCokkaToppled = this.diCokkas.indexOf(diCokka);
    this.diCokkas.splice(diCokkaToppled, 1);

    const bulletOff = this.player.bullets.indexOf(bullet);
    this.player.bullets.splice(bulletOff, 1);
  }

  bombCollidesPlayer(bomb) {
    const exBomb = this.bombs.indexOf(bomb);
    this.bombs.splice(exBomb, 1);
  }

  clearSoldier() {
    this.soldiers = this.soldiers.filter((soldiers) => soldiers.isVisible());

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  clearDiCokka() {
    this.diCokkas = this.diCokkas.filter((diCokka) => diCokka.isVisible());

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  clearBomb() {
    this.bombs = this.bombs.filter((bombs) => bombs.isVisible());

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawLife() {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(5, 5, 106, 20);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(7, 7, this.life, 16);
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px serif";
    this.ctx.fillText(`Life`, 5, 50);
  }

  drawScore() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bolder 30px Arial";
    this.ctx.shadowColor = "white";
    this.ctx.fillText(`Score: ${this.score}`, 10, ctx.canvas.height * 0.95);
  }

  stop() {
    this.audio.play();
    clearInterval(this.interval);
  }

  gameOver() {
    if (this.life <= 0) {
      this.ctx.drawImage(
        this.gameOverImg,
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
      );

      this.stop();

      const welcome = document.getElementById("welcome");
      welcome.style.display = "none";

      const controlPage = document.getElementById("secondPage");
      controlPage.style.display = "none";

      const controlGame = document.getElementById("game-over");
      controlGame.style.display = "block";
    }
  }
}
