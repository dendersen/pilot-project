class Skrald {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.spawnY = y;
    this.y = y;
    this.h = 100;
    this.w = 100;
  }

  tick() {
    this.y = offset + this.spawnY;
  }

  show() {
    image(this.img, this.x, this.y, this.w, this.h);
  }
}
