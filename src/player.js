class Player {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 50;
    this.y = 0;
    this.y0 = ctx.canvas.height * 0.72
    this.w = 40;
    this.h = 75;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0.5;

    this.img = new Image();
    this.img.src = "resources/images/Marco Rossi.png";
    this.img.frames = 4;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.isBendDown = false;
    this.isShot = false;

    this.bullets = [];

    this.audioShoot = new Audio("resources/sounds/spas-shot-1.mp3");
    this.audioShoot.volume = 0.3;
  }

  bendDown() {
    if (this.isBendDown) {
      return;
    }
    this.isBendDown = true;
    this.img.src = "resources/images/playerBend.png";
    this.img.frames = 1;
    this.img.frameIndex = 0;
    this.w = 40;
    this.h = 55;
    this.y0 = ctx.canvas.height * 0.65 + 25;
  }

  moveShoot() {
    if (this.isShot) {
      return;
    }
    this.shot = true;
    this.img.src = "resources/images/playerShoot.png";
    this.img.frames = 3;
    this.img.frameIndex = 0;
  }

  run() {
    this.isBendDown = false;
    this.img.src = "resources/images/Marco Rossi.png";
    this.img.frames = 4;
    this.img.frameIndex = 0;
    this.w = 40;
    this.h = 75;
    this.y0 = ctx.canvas.height * 0.65;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex * this.img.width) / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    

    this.bullets.forEach((b) => b.draw());

    this.animate();
  }

  animate() {
    this.tick++;

    if (this.tick > 30) {
      this.tick = 0;
      this.img.frameIndex++;

      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0;
      }
    }
  }

  shoot() {
    const x = this.x + this.w;
    const y = this.y + this.h * 0.25;
    const bullet = new Bullet(this.ctx, x, y);
    this.bullets.push(bullet);
  }

  move() {
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;

    if (this.y >= this.y0) {
      this.y = this.y0;
      this.vy = 0;
    }
    if (this.x <= 0) {
      this.vx = 0;
      this.x = 0;
    }
    if (this.x + this.w >= ctx.canvas.width) {
      this.vx = 0;
      this.x = ctx.canvas.width - this.w;
    }

    this.bullets.forEach((b) => b.move());
  }

  clearBullets() {
    this.bullets = this.bullets.filter((b) => b.isVisible());
  }

  jump() {
    if (this.y === this.y0) {
      this.vy = -15;
    }
  }

  onKeyDown(key) {
    switch (key) {
      case RIGHT:
        this.vx = 3;
        break;
      case LEFT:
        this.vx = -3;
        break;
      case JUMP:
        this.jump();
        break;
      case BENDOWN:
        this.bendDown();
        break;
      case SHOOT:
        this.moveShoot();
        break;
    }
  }

  onKeyUP(key) {
    switch (key) {
      case RIGHT:
        this.vx = 0;
        break;
      case LEFT:
        this.vx = 0;
        break;
      case JUMP:
        this.ay = 1;
        break;
      case SHOOT:
        this.shoot();
        this.audioShoot.play();
        this.run();
        break;
      case BENDOWN:
        this.run();
        break;
    }
  }
}
