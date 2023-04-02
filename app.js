import Particle from './particle';

const container = document.getElementById('container');

const loadImages = (paths, whenLoaded) => {
  const imgs = [];
  const img0 = [];

  paths.forEach((path) => {
    const img = new Image();

    img.onload = () => {
      imgs.push(img);
      img0.push({ path, img });
      console.log(imgs.length, paths.length);

      if (imgs.length === paths.length) whenLoaded(img0);
    };
    img.src = path;
  });
};

class Sketch {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    container.appendChild(this.canvas);

    this.time = 0;
    this.x = 0;
    this.y = 0;
    this.particles = [];
    this.colors = [
      '#19f81e',
      '#e2d003',
      '#09fb80',
      '#fa7282',
      '#23bce7',
      '#aff384',
    ];

    this.mouseMove();
    this.randomColor();
    this.raf();

    loadImages(['youtube-logo.png'], (images) => {
      this.img = images[0].img;
    });
  }

  randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  mouseMove() {
    this.canvas.addEventListener('mousemove', (e) => {
      let x = e.clientX;
      let y = e.clientY;
      let distCenter = Math.sqrt(
        (x - this.width / 2) ** 2 + (y - this.height / 2) ** 2
      );

      distCenter /= Math.sqrt((this.width / 2) ** 2 + (this.height / 2) ** 2);
      distCenter = 1 - distCenter;

      let dx = x - this.x;
      let dy = y - this.y;

      for (let i = 0; i < 4; i++) {
        let speedX = Math.floor(dx / 5 + 3 * (Math.random() - 0.5));
        let speedY = Math.floor(dy / 5 + 3 * (Math.random() - 0.5));

        this.particles.push(
          new Particle(
            this.img,
            x,
            y,
            this.randomColor(),
            speedX,
            speedY,
            distCenter
          )
        );
      }

      this.x = x;
      this.y = y;
    });
  }

  raf() {
    this.time++;
    this.ctx.clearRect(0, 0, this.width, this.height);
    // this.ctx.fillRect(this.x, this.y, 100, 100);

    this.particles.forEach((p, i) => {
      if (p.life > 0) {
        p.draw(this.ctx);
      } else {
        this.particles.splice(i, 1);
      }
    });

    window.requestAnimationFrame(this.raf.bind(this));
  }
}

new Sketch();
