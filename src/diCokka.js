class DiCokka {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = ctx.canvas.width;
    this.y = ctx.canvas.height * 0.7;
    this.w = 105;
    this.h = 110;
    this.vx = -3;
    this.vy = 0;

    this.img = new Image();
    this.img.src = "resources/images/DiCokka.png";
    this.img.frames = 7;
    this.img.frameIndex = 0;
    this.tick = 0;

    this.bulletsDiCokka = [];
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

    this.bulletsDiCokka.forEach((bulletDiCokka) => bulletDiCokka.draw());

    this.animate();
  }

  animate() {
    this.tick++;

    if (this.tick > 30) {
      this.tick = 0;
      this.img.frameIndex++;

      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0;
        if ((this.img.frameIndex = this.img.frames - 2)) {
          this.diCokkaShoot();
        }
      }
    }
  }

  diCokkaShoot() {
    const x = this.x;
    const y = ctx.canvas.height * 0.7;
    const bullet = new BulletDiCokka(this.ctx, x, y);
    this.bulletsDiCokka.push(bullet);
  }

  move() {
    this.x += this.vx;

    if (this.x <= 600) {
      this.vx = 0;
      this.x = 600;
    }

    this.bulletsDiCokka.forEach((bulletDiCokka) => bulletDiCokka.move());
  }

  woundedBullet(bullet) {
    return (
      bullet.x + bullet.w >= this.x &&
      bullet.x <= this.x + this.w &&
      bullet.y + bullet.h >= this.y &&
      bullet.y <= this.y + this.h
    );
  }

  isVisible() {
    return this.x + this.w >= 0 && this.x <= this.ctx.canvas.width;
  }

  clearBulletsDiCokka() {
    this.bulletsDiCokka = this.bulletsDiCokka.filter((bulletsDiCokka) =>
      bulletsDiCokka.isVisible()
    );
  }
}
