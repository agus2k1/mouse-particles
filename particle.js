export default class Particle {
  constructor(img, x, y, color, speedX, speedY, size) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.color = color;
    this.defaultSize = 10 * size;
    this.speedX = speedX;
    this.speedY = speedY;

    this.maxLife = 10;
    this.life = 10 + 5 * Math.random();
    this.gravity = 0;
    this.rotation = Math.random() * 2 * Math.PI;
  }

  draw(ctx) {
    this.x += this.speedX;
    this.y += this.speedY + this.gravity;

    this.speedX *= 0.99;
    this.speedY *= 0.99;

    this.size = (this.defaultSize * this.life) / this.maxLife;
    this.life -= 0.1;
    this.gravity += 0.01;
    this.rotation += this.life / 200;

    ctx.fillStyle = this.color;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillRect(0, 0, this.size, this.size);
    // ctx.drawImage(this.img, 0, 0, this.size, this.size);
    ctx.restore();
  }
}
